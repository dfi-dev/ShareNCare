const express = require("express");
const passport = require("passport");
const { signup, login, forgotPassword, resetPassword, confirmEmail, googleAuth, googleAuthCallback, githubAuth, githubAuthCallback, oauthAuthFailure} = require("../controllers/authController");
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
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/api/auth/oauth/failure"}), googleAuthCallback);

// GitHub OAuth login
router.get("/github", githubAuth);

// GitHub OAuth callback
router.get("/github/callback", passport.authenticate("github", { session: false, failureRedirect: "/api/auth/oauth/failure"}), githubAuthCallback);

// Handle failed authentication for both Google and GitHub
router.get("/oauth/failure", oauthAuthFailure);

module.exports = router;
