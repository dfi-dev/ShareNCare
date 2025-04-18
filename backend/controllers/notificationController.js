const Notification = require("../models/Notification");
const { successResponse, errorResponse } = require('../utils/responseHelper.js');

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return successResponse(res, "Notifications fetched successfully", { notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return errorResponse(res, "Failed to fetch notifications", { error: err.message });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return errorResponse(res, "Notification not found", {}, 404);
    }

    return successResponse(res, "Notification marked as read. Auto-deletion scheduled.", { notification });
  } catch (err) {
    console.error("Error updating notification:", err);
    return errorResponse(res, "Failed to update notification", { error: err.message });
  }
};


