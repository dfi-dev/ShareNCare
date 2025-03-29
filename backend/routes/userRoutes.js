const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfile, updatePreferences, changePassword, deleteAccount } = require("../controllers/userController");

const router = express.Router();

// Update user profile
router.put('/profile', authMiddleware, updateProfile);

// Update notification preferences
router.put("/preferences", authMiddleware, updatePreferences);

// Change user password
router.put("/change-password", authMiddleware, changePassword);

// Delete account
router.delete("/delete", authMiddleware, deleteAccount);



module.exports = router;
