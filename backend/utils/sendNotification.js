const Notification = require("../models/Notification");

module.exports = async (userId, message) => {
  await Notification.create({ userId, message });
};
