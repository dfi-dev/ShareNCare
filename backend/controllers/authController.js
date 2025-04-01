const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userDTO = require("../utils/userDto");
const { generateJWTToken, generatePasswordResetToken } = require("../utils/tokenUtils");
const sendEmail = require("../utils/sendEmail");
const getEmailTemplate = require("../templates/emailTemplate");
const emailContent = require("../templates/emailContent");
const jwt = require('jsonwebtoken');



// Signup
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, role, phone, address, dob, gender } = req.body;

    if (!fullName || !email || !password || !role || !phone || !address || !dob || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      dob,
      gender
    });

    // Generate confirmation token
    const emailConfirmationToken = generateJWTToken({ userId: newUser._id })

    newUser.emailConfirmationToken = emailConfirmationToken;
    await newUser.save();

    // Send confirmation email
    const confirmationLink = `${process.env.FRONTEND_URL || "www.example.com"}/confirm-email?token=${emailConfirmationToken}`;

    const confirmationHTML = getEmailTemplate(
      newUser.fullName,
      emailContent.CONFIRM_EMAIL.title,
      emailContent.CONFIRM_EMAIL.message,
      emailContent.CONFIRM_EMAIL.buttonText,
      confirmationLink
    );

    await sendEmail(newUser.email, emailContent.CONFIRM_EMAIL.title, confirmationHTML);
    res.status(201).json({
      message: "User registered successfully! Please check your email to confirm your account.",
      user: userDTO(newUser),
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isDeleted) {
      return res.status(403).json({ message: "The account could not be found or may have been deleted. Please contact support for assistance." });
    }

    if (!user.isEmailConfirmed) {
      return res.status(403).json({
        message: "Please confirm your email before logging in."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateJWTToken({ userId: user._id, fullName: user.fullName })

    res.json({ token, user: userDTO(user) });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const { resetToken, resetTokenHash } = generatePasswordResetToken();
      
      user.resetPasswordToken = resetTokenHash;
      user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

      await user.save();

      const resetLink = `${process.env.FRONTEND_URL || "https://www.example.com"}/reset-password/${resetToken}`;
      // Generate the HTML email template
      const resetHTML = getEmailTemplate(
        user.fullName, // User's name
        emailContent.PASSWORD_RESET.title,
        `${emailContent.PASSWORD_RESET.message}<br><strong>Reset Link:</strong> <a href="${resetLink}" target="_blank">Reset Password</a>`,
        emailContent.PASSWORD_RESET.buttonText,
        resetLink
      );

      // Send the reset email
      await sendEmail(
        user.email,
        emailContent.PASSWORD_RESET.title,
        resetHTML
      );

      res.status(200).json({
          message: "Password reset link sent successfully. Check your email."
      });

  } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
      const { newPassword } = req.body;   
      const { token } = req.params;

      if (!token) {
          return res.status(400).json({ message: "Reset token is required." });
      }

      const user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() } 
      });

      if (!user) {
          return res.status(400).json({ message: "Invalid or expired reset token." });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();

      res.status(200).json({ message: "Password reset successful. You can now log in with your new password." });

  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};


exports.confirmEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Invalid or missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailConfirmed) {
      return res.status(400).json({ message: "Email already confirmed" });
    }

    // Confirm the email
    user.isEmailConfirmed = true;
    user.emailConfirmationToken = null;
    await user.save();

    res.status(200).json({ message: "Email confirmed successfully!" });

  } catch (error) {
    console.error("Email confirmation error:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};