const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userDTO = require("../utils/userDto");
const { generateJWTToken, generatePasswordResetToken } = require("../utils/tokenUtils");
const sendEmail = require("../utils/sendEmail");
const getEmailTemplate = require("../templates/emailTemplate");
const emailContent = require("../templates/emailContent");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const { successResponse, errorResponse } = require('../utils/responseHelper.js');


// Signup
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, role, phone, address, dob, gender } = req.body;

    if (!fullName || !email || !password || !role || !phone || !address || !dob || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "Email is already registered", {}, 400);
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

    newUser.emailConfirmationToken = "emailConfirmationToken";
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

    // Send success response
    return successResponse(res, "User registered successfully! Please check your email to confirm your account.", {
      user: userDTO(newUser),
    }, 201);
  } catch (err) {
    console.error("Signup error:", err);
    // Send error response in case of failure
    return errorResponse(res, "Signup failed", { message: err.message }, 500);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, "Invalid credentials", {}, 401);
    }

    if (user.isDeleted) {
      return errorResponse(
        res,
        "The account could not be found or may have been deleted. Please contact support for assistance.",
        {},
        403
      );
    }

    if (!user.isEmailConfirmed) {
      return errorResponse(
        res,
        "Please confirm your email before logging in.",
        {},
        403
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, "Invalid credentials", {}, 401);
    }

    const token = sgenerateJWTToken({ userId: user._id, fullName: user.fullName })

    // Send success response with token and user data
    return successResponse(res, "Login successful", {
      token,
      user: userDTO(user),
    }, 200);

  } catch (err) {
    console.error("Login error:", err);
    // Send error response in case of any unexpected issues
    return errorResponse(res, "Login failed", { message: err.message }, 500);
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, "User not found", {}, 404);
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

    return successResponse(res, "Password reset link sent successfully. Check your email.");

  } catch (error) {
    console.error("Forgot password error:", error);
    return errorResponse(res, "Internal Server Error", error.message, 500);
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    if (!token) {
      return errorResponse(res, "Reset token is required.", {}, 400);
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return errorResponse(res, "Invalid or expired reset token.", {}, 400);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    // Send success response
    return successResponse(res, "Password reset link sent successfully. Check your email.", {}, 200);

  } catch (error) {
    console.error("Error resetting password:", error);
    // Send error response in case of failure
    return errorResponse(res, "Internal Server Error", { message: error.message }, 500);
  }
};


exports.confirmEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return errorResponse(res, "Invalid or missing token", {}, 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return errorResponse(res, "User not found", {}, 404);
    }

    if (user.isEmailConfirmed) {
      return errorResponse(res, "Email already confirmed", {}, 400);
    }

    // Confirm the email
    user.isEmailConfirmed = true;
    user.emailConfirmationToken = null;
    await user.save();

    // Send success response
    return successResponse(res, "Email confirmed successfully!", {}, 200);

  } catch (error) {
    console.error("Email confirmation error:", error);
    // Send error response in case of invalid or expired token
    return errorResponse(res, "Invalid or expired token", { message: error.message }, 400);
  }
};

// Google OAuth Redirect (handled by Passport)
exports.googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};

// Google OAuth Callback
exports.googleAuthCallback = async (req, res) => {
  try {
    const user = req.user; // Retrieved from Passport authentication

    if (!user) {
      return errorResponse(res, "Google authentication failed", {}, 401);
    }

    // Generate a JWT token
    const token = generateJWTToken({ userId: user._id, fullName: user.fullName });

    // Return success response
    return successResponse(res, "Google login successful", { token, user: userDTO(user) }, 200);

  } catch (error) {
    console.error("Google login error:", error);
    // Return error response for any issues
    return errorResponse(res, "Internal server error", { message: error.message }, 500);
  }
};

// Github OAuth Redirect (handled by Passport)
exports.githubAuth = (req, res, next) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
};


// Github OAuth Callback
exports.githubAuthCallback = async (req, res) => {
  try {
    const user = req.user; // Retrieved from Passport GitHub strategy

    if (!user) {
      return errorResponse(res, "GitHub authentication failed", {}, 401);
    }

    const token = generateJWTToken({ userId: user._id, fullName: user.fullName });

    // Return success response
    return successResponse(res, "GitHub login successful", { token, user: userDTO(user) }, 200);

  } catch (error) {
    console.error("GitHub login error:", error);
    // Return error response for any issues
    return errorResponse(res, "Internal server error", { message: error.message }, 500);
  }
};

exports.oauthAuthFailure = (req, res) => {
  // You can send specific details about the failure
  const errorMessage = req.query.error_description || "OAuth authentication was canceled by the user.";

  // Redirect to frontend with the error message
  const failureRedirect = `http://localhost:5173/login-failed?error=true&message=${encodeURIComponent(errorMessage)}`;
  res.redirect(failureRedirect);
};
