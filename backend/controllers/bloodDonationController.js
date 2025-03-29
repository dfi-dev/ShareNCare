const BloodDonation = require("../models/BloodDonation");
const RecipientBloodRequest = require("../models/RecipientBloodRequest");
const sendNotification = require("../utils/sendNotification");
const emitEvent = require('../socket/emitEvent')




exports.createBloodDonation = async (req, res) => {

  try {
    const { bloodGroup, lastDonationDate, weight, medicalConditions, recentSurgeries, consent } = req.body;

    if (!bloodGroup || !weight || consent === undefined) {
      return res.status(400).json({ message: "Blood group, weight, and consent are required" });
    }

    if (req.user.role !== "donor") {
      return res.status(403).json({ message: "Only donors can submit a blood donation" });
    }

    const bloodDonation = new BloodDonation({
      donor: req.user.id,
      bloodGroup,
      lastDonationDate,
      weight,
      medicalConditions,
      recentSurgeries,
      consent,
    });

    await bloodDonation.save();
    
    emitEvent(req.io, {roles:["recipient"]}, "updateBloodDonations", bloodDonation);
    const bloodDonations = await BloodDonation.countDocuments({ status: 'completed' });
    emitEvent(req.io, "all", "updateStats", { bloodDonations });


    res.status(201).json({ message: "Blood donation request submitted", bloodDonation });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit request", error: err.message });
  }
};

/**
 * @desc Request blood as a recipient
 * @route POST /api/blood-donation/request
 * @access Recipient only
 */
exports.requestBlood = async (req, res) => {
  try {
    const { bloodDonationId, urgencyLevel, message } = req.body;

    // ✅ Ensure required fields are provided
    if (!bloodDonationId || !urgencyLevel) {
      return res.status(400).json({ message: "Blood donation ID and urgency level are required" });
    }

    if (req.user.role !== "recipient") {
      return res.status(403).json({ message: "Only recipients can request blood" });
    }

    const bloodRequest = new RecipientBloodRequest({
      bloodDonation: bloodDonationId,
      recipient: req.user.id,
      urgencyLevel,
      status: "pending",
      message: message || "",  // Optional message
    });

    await bloodRequest.save();

    req.io.emit("newBloodRequest", { bloodRequest });

    await sendNotification(
      {
        target: "donor",
        excludeUser: req.user.id
      },
      
      "New Blood Request Created",
      "A new blood donation request has been submitted. Please review.",
      req.io
    );

    res.status(201).json({ message: "Blood request submitted successfully", bloodRequest });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit blood request", error: err.message });
  }
};


exports.getAllBloodDonations = async (req, res) => {
  try {
    const bloodDonations = await BloodDonation.find().populate("donor", "fullName email");
    res.json(bloodDonations);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve blood donations", error: err.message });
  }
};


exports.getAvailableBloodDonations = async (req, res) => {
  try {
    const availableBloodDonations = await BloodDonation.find({ status: "approved" }).populate("donor", "fullName email");
    res.json(availableBloodDonations);
  } catch (err) {
    res.status(500).json({ 
      message: "Failed to retrieve available blood donations", 
      error: err.message 
    });
  }
};


exports.getUserBloodDonations = async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(403).json({ message: "Only donors can view their blood donations" });
    }

    const userDonations = await BloodDonation.find({ donor: req.user.id });
    res.json(userDonations);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve your donations", error: err.message });
  }
};

/**
 * @desc Get all blood requests (Admin)
 * @route GET /api/blood-donation/requests
 * @access Admin only
 */
exports.getBloodRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can view blood requests" });
    }

    const bloodRequests = await BloodDonation.find({ recipient: { $ne: null } }).populate("recipient", "fullName email");
    res.json(bloodRequests);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve blood requests", error: err.message });
  }
};

exports.updateBloodDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { bloodGroup, lastDonationDate, weight, medicalConditions, recentSurgeries, consent } = req.body;

    const bloodDonation = await BloodDonation.findById(donationId);
    if (!bloodDonation) {
      return res.status(404).json({ message: "Blood donation not found" });
    }

    if (bloodDonation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own blood donations" });
    }


    if (bloodGroup) bloodDonation.bloodGroup = bloodGroup;
    if (lastDonationDate) bloodDonation.lastDonationDate = lastDonationDate;
    if (weight) bloodDonation.weight = weight;
    if (medicalConditions) bloodDonation.medicalConditions = medicalConditions;
    if (recentSurgeries) bloodDonation.recentSurgeries = recentSurgeries;
    if (consent !== undefined) bloodDonation.consent = consent;

    await bloodDonation.save();

    // ✅ Emit real-time event
    req.io.emit("bloodDonationUpdated", { donationId: bloodDonation._id, bloodDonation });

    // ✅ Send notification to the donor
    await sendNotification(req.io, bloodDonation.donor, "Your blood donation details have been updated.");

    res.json({ message: "Blood donation updated successfully", bloodDonation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update blood donation", error: err.message });
  }
};

exports.deleteBloodDonation = async (req, res) => {
  try {
    const { donationId } = req.params;

    const bloodDonation = await BloodDonation.findById(donationId);
    if (!bloodDonation) {
      return res.status(404).json({ message: "Blood donation not found" });
    }

    if (bloodDonation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own blood donations" });
    }

    await bloodDonation.deleteOne();

    req.io.emit("bloodDonationDeleted", { donationId });

    await sendNotification(req.io, bloodDonation.donor, "Your blood donation has been deleted.");

    res.json({ message: "Blood donation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blood donation", error: err.message });
  }
};

exports.updateBloodDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { bloodGroup, lastDonationDate, weight, medicalConditions, recentSurgeries, consent } = req.body;

    const bloodDonation = await BloodDonation.findById(donationId);
    if (!bloodDonation) {
      return res.status(404).json({ message: "Blood donation not found" });
    }


    if (bloodDonation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own blood donations" });
    }

    if (bloodGroup) bloodDonation.bloodGroup = bloodGroup;
    if (lastDonationDate) bloodDonation.lastDonationDate = lastDonationDate;
    if (weight) bloodDonation.weight = weight;
    if (medicalConditions) bloodDonation.medicalConditions = medicalConditions;
    if (recentSurgeries) bloodDonation.recentSurgeries = recentSurgeries;
    if (consent !== undefined) bloodDonation.consent = consent;

    await bloodDonation.save();

    // ✅ Emit real-time event
    req.io.emit("bloodDonationUpdated", { donationId: bloodDonation._id, bloodDonation });

    // ✅ Send notification to the donor
    await sendNotification(req.io, bloodDonation.donor, "Your blood donation details have been updated.");

    res.json({ message: "Blood donation updated successfully", bloodDonation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update blood donation", error: err.message });
  }
};


exports.updateBloodDonationStatus = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const bloodDonation = await BloodDonation.findById(donationId);
    if (!bloodDonation) {
      return res.status(404).json({ message: "Blood donation not found" });
    }

    // Only admin can change the status
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can update blood donation status" });
    }

    bloodDonation.status = status;
    await bloodDonation.save();

    // ✅ Emit real-time event
    req.io.emit("bloodDonationStatusUpdated", {
      donationId: bloodDonation._id,
      status: bloodDonation.status,
    });

    // ✅ Send notification to the donor
    await sendNotification(req.io, bloodDonation.donor, `Your blood donation status is now ${status}`);

    res.json({ message: "Blood donation status updated successfully", bloodDonation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update blood donation status", error: err.message });
  }
};
