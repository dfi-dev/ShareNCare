const Notification = require("../models/Notification");

const sendNotification = async (userId, message) => {
  try {
    const notification = new Notification({ userId, message });
    await notification.save();

    // ✅ Emit event for real-time updates
    global.io.emit("newNotification", { userId, message });
  } catch (err) {
    console.error("Error sending notification:", err);
  }
};

module.exports = sendNotification;
