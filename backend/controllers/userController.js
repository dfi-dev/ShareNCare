const User = require("../models/User");
const GeneralDonation = require('../models/GeneralDonation');
const BloodDonation = require('../models/BloodDonation');
const Notification = require('../models/Notification');
const RecipientGeneralRequest = require('../models/RecipientGeneralRequest');
const RecipientBloodRequest = require('../models/RecipientBloodRequest');
const { addDays } = require("date-fns");

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { fullName, email, phone, address, dob, gender, notificationPreferences } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          fullName,
          email,
          phone,
          address,
          dob,
          gender,
          notificationPreferences
        }
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return errorResponse(res, "User not found", {}, 404);
    }

    return successResponse(res, "Profile updated successfully", { user: updatedUser }, 200);

  } catch (error) {
    console.error("Error updating profile:", error);
    return errorResponse(res, "Internal Server Error", { error: error.message }, 500);
  }
};


exports.updatePreferences = async (req, res) => {
  try {
    const { donationUpdates, statusChanges } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, "User not found", {}, 404);
    }

    // Update preferences
    user.notificationPreferences = {
      donationUpdates: donationUpdates ?? user.notificationPreferences.donationUpdates,
      statusChanges: statusChanges ?? user.notificationPreferences.statusChanges
    };

    await user.save();
    return successResponse(res, "Preferences updated successfully", { preferences: user.notificationPreferences }, 200);
  } catch (err) {
    console.error("Error updating preferences:", err);
    return errorResponse(res, "Failed to update preferences", { error: err.message }, 500);
  }
};



exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return errorResponse(res, "Current and new passwords are required", {}, 400);
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return errorResponse(res, "User not found", {}, 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return errorResponse(res, "Current password is incorrect", {}, 401);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return successResponse(res, "Password changed successfully", {}, 200);

  } catch (error) {
    console.error("Error changing password:", error);
    return errorResponse(res, "Internal Server Error", { error: error.message }, 500);
  }
};


exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return errorResponse(res, "User not found", {}, 404);
    }

    if (user.isDeleted) {
      const expirationDate = addDays(user.deletedAt, 30).toLocaleDateString();
      return errorResponse(res, `We have already received your deletion request. Your account will be permanently deleted within 30 days from the request date, with the expected deletion date being ${expirationDate}.`, {}, 400);
    }

    user.isDeleted = true;
    user.deletedAt = new Date()
    await user.save();

    const generalDonations = await GeneralDonation.find({ $or: [{ donor: userId }, { recipient: userId }] });

    for (const generalDonation of generalDonations) {
      const updatedFields = {};

      if (generalDonation.donor?.toString() === userId) {
        updatedFields.donor = "deletedUser";
      }

      if (generalDonation.recipient?.toString() === userId) {
        updatedFields.recipient = "deletedUser";
      }

      await GeneralDonation.findByIdAndUpdate(generalDonation._id, { $set: updatedFields });
    }

    // Update BloodDonation References
    const bloodDonations = await BloodDonation.find({ $or: [{ donor: userId }, { recipient: userId }] });

    for (const bloodDonation of bloodDonations) {
      const updatedFields = {};

      if (bloodDonation.donor?.toString() === userId) {
        updatedFields.donor = "deletedUser";
      }

      if (bloodDonation.recipient?.toString() === userId) {
        updatedFields.recipient = "deletedUser";
      }

      await BloodDonation.findByIdAndUpdate(bloodDonation._id, { $set: updatedFields });
    }

    await RecipientGeneralRequest.deleteMany({ recipient: userId });

    await RecipientBloodRequest.deleteMany({ recipient: userId });

    await Notification.deleteMany({ userId });

    return successResponse(res, "We have received your account deletion request. Your account will be permanently deleted within 30 days from the request date.", {}, 200
    );

  } catch (error) {
    console.error("Error deleting account:", error);
    return errorResponse(res, "Internal Server Error", { error: error.message }, 500);
  }
};