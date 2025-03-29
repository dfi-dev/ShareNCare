const mongoose = require("mongoose");
const User = require("../models/User");

const deleteInactiveUsers = async () => {
  try {
    const THIRTY_DAYS_AGO = new Date();
    THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);

    const result = await User.deleteMany({
      isDeleted: true,
      deletedAt: { $lte: THIRTY_DAYS_AGO }
    });

    console.log(`Deleted ${result.deletedCount} inactive accounts.`);
  } catch (error) {
    console.error("Error deleting inactive accounts:", error);
  }
};

setInterval(deleteInactiveUsers, 24 * 60 * 60 * 1000);
