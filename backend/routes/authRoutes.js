const express = require("express");
const { signup, login, forgotPassword, resetPassword, confirmEmail } = require("../controllers/authController");
const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Forgot Password (Send Reset Link)
router.post("/forgot-password", forgotPassword);

// Reset Password (Using Token)
router.post("/reset-password/:token", resetPassword);

// Confirm Signup
router.get("/confirm-email", confirmEmail);

module.exports = router;
