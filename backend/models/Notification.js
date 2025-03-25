const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["donation_update", "approval", "reminder"], required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
