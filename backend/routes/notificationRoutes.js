const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getUserNotifications, markNotificationAsRead } = require("../controllers/notificationController");

const router = express.Router();

// Get user notifications
router.get("/", authMiddleware, getUserNotifications);

// Mark notification as read
router.put("/:id/read", authMiddleware, markNotificationAsRead);

module.exports = router;
