const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["donation_update", "approval", "reminder"], required: true },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true }
);

NotificationSchema.index({ readAt: 1 }, { expireAfterSeconds: 1 * 24 * 60 * 60 });

const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
