const express = require("express");
const passport = require("passport");
const { signup, login, forgotPassword, resetPassword, confirmEmail, googleAuth, googleAuthCallback, googleAuthFailure} = require("../controllers/authController");
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
router.post("/confirm-email", confirmEmail);

// Google OAuth login
router.get("/google", googleAuth);

// Google OAuth callback
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/auth/google/failure" }), googleAuthCallback);

// Handle failed authentication
router.get("/auth/google/failure", googleAuthFailure);

module.exports = router;
