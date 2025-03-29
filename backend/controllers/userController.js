const User = require("../models/User");
const Donation = require('../models/Donation');
const BloodDonation = require('../models/BloodDonation');
const Notification = require('../models/Notification');
const RecipientRequest = require('../models/RecipientRequest');
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
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser
      });
  
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


exports.updatePreferences = async (req, res) => {
    try {
        const { donationUpdates, statusChanges } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update preferences
        user.notificationPreferences = {
            donationUpdates: donationUpdates ?? user.notificationPreferences.donationUpdates,
            statusChanges: statusChanges ?? user.notificationPreferences.statusChanges
        };

        await user.save();

        res.status(200).json({
            message: "Preferences updated successfully",
            preferences: user.notificationPreferences
        });
    } catch (err) {
        console.error("Error updating preferences:", err);
        res.status(500).json({ message: "Failed to update preferences", error: err.message });
    }
};



exports.changePassword = async (req, res) => {
    const userId = req.user.id;  
    const { currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required" });
    }
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      await user.save();
  
      res.status(200).json({ message: "Password changed successfully" });
  
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.deleteAccount = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isDeleted) {
        const expirationDate = addDays(user.deletedAt, 30).toLocaleDateString();
        return res.status(400).json({
          message: `We have already received your deletion request. Your account will be permanently deleted within 30 days from the request date, with the expected deletion date being ${expirationDate}.`
        });
      }
  
      user.isDeleted = true; 
      user.deletedAt = new Date()   
      await user.save();
  
      const donations = await Donation.find({ $or: [{ donor: userId }, { recipient: userId }] });
  
      for (const donation of donations) {
        const updatedFields = {};
  
        if (donation.donor?.toString() === userId) {
          updatedFields.donor = "deletedUser";
        }
  
        if (donation.recipient?.toString() === userId) {
          updatedFields.recipient = "deletedUser";
        }

        await Donation.findByIdAndUpdate(donation._id, { $set: updatedFields });
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
  
      await RecipientRequest.deleteMany({ recipient: userId });
  
      await RecipientBloodRequest.deleteMany({ recipient: userId });
  
      await Notification.deleteMany({ userId });
  
      res.status(200).json({ message: `We have received your account deletion request. Your account will be permanently deleted within 30 days from the request date`});
  
    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };