const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userDTO = require("../utils/userDto");
const generateToken = require("../utils/jwtHelper");


exports.signup = async (req, res) => {
  try {
    console.log(req.body)
    const { fullName, email, password, role, phone, address, dob, gender } = req.body;

    if (!fullName || !email || !password || !role || !phone || !address || !dob || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ fullName, email, password: hashedPassword, role, phone, address, dob, gender });
    await user.save();

    const token = generateToken(user, "7d");

    res.status(201).json({
      message: "User registered successfully!",
      user: userDTO(user),
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user, "1d");

    res.json({ token, user: userDTO(user)});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};