const User = require("../models/User");
const Notification = require("../models/Notification");
const socketUserMap = require("../utils/socketUserMap");

const BATCH_SIZE = 50;

const sendNotification = async ({ target, excludeUser = null }, message, type, io) => {
  try {
    if (target && target !== "all") {
      // 🔹 Specific User (userId)
      if (typeof target === "string" && !["donor", "recipient", "admin"].includes(target)) {
        const user = await User.findById(target);
        if (!user) {
          console.warn(`User with ID ${target} not found.`);
          return;
        }

        const { notificationPreferences } = user;
        if (
          (type === "donation_update" && !notificationPreferences?.donationUpdates) ||
          (type === "status_change" && !notificationPreferences?.statusChanges)
        ) {
          console.log(`Skipping notification for ${user.fullName} due to preferences`);
          return;
        }

        const socketId = socketUserMap.users[target];
        if (socketId) {
          io.to(socketId).emit("newNotification", { message, type });
          console.log(`Notification sent to ${user.fullName} (socket ID: ${socketId})`);
        } else {
          console.log(`User ${user.fullName} is offline. Storing notification in DB.`);
        }

        await new Notification({ userId: target, message, type }).save();
        return;
      }

      // 🔹 Role-Based Notifications (Efficient Way)
      if (["donor", "recipient", "admin"].includes(target)) {
        io.to(target).emit("newNotification", { message, type });
        console.log(`Notification sent to all ${target}s`);
        return;
      }
    }

    // 🔹 Send to ALL Users
    const totalUsers = await User.countDocuments({
      _id: { $ne: excludeUser },
      $or: [
        { "notificationPreferences.donationUpdates": true },
        { "notificationPreferences.statusChanges": true }
      ]
    });

    for (let skip = 0; skip < totalUsers; skip += BATCH_SIZE) {
      const users = await User.find({
        _id: { $ne: excludeUser },
        $or: [
          { "notificationPreferences.donationUpdates": true },
          { "notificationPreferences.statusChanges": true }
        ]
      })
        .skip(skip)
        .limit(BATCH_SIZE);

      const notificationsToSave = [];

      users.forEach((user) => {
        const socketId = socketUserMap.users[user.id];
        if (socketId) {
          io.to(socketId).emit("newNotification", { message, type });
          console.log(`Notification sent to ${user.fullName} (socket ID: ${socketId})`);
        } else {
          console.log(`User ${user.fullName} is offline. Storing notification in DB.`);
          notificationsToSave.push({ userId: user.id, message, type });
        }
      });

      if (notificationsToSave.length) {
        await Notification.insertMany(notificationsToSave);
        console.log(`Stored ${notificationsToSave.length} notifications in the database.`);
      }
    }
  } catch (error) {
    console.error(`Error sending notification:`, error);
  }
};

module.exports = sendNotification;
