const BloodDonation = require("../models/BloodDonation");
const RecipientBloodRequest = require("../models/RecipientBloodRequest");
const sendNotification = require("../utils/sendNotification");
const emitEvent = require('../socket/emitEvent')
const { successResponse, errorResponse } = require('../utils/responseHelper.js');




exports.createBloodDonation = async (req, res) => {

  try {
    const { bloodGroup, lastDonationDate, weight, medicalConditions, recentSurgeries, consent } = req.body;

    if (!bloodGroup || !weight || consent === undefined) {
      return errorResponse(res, "Blood group, weight, and consent are required", {}, 400);
    }

    if (req.user.role !== "donor") {
      return errorResponse(res, "Only donors can submit a blood donation", {}, 403);
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

    // emitEvent(req.io, { roles: ["recipient"] }, "updateBloodDonations", bloodDonation);
    // const bloodDonations = await BloodDonation.countDocuments({ status: 'completed' });
    // emitEvent(req.io, "all", "updateStats", { bloodDonations });


    return successResponse(res, "Blood donation submitted", { bloodDonation }, 201);
  } catch (err) {
    return errorResponse(res, "Failed to submit blood donation", { message: err.message }, 500);
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

    if (!bloodDonationId || !urgencyLevel) {
      return errorResponse(res, "Blood donation ID and urgency level are required", {}, 400);
    }

    if (req.user.role !== "recipient") {
      return errorResponse(res, "Only recipients can request blood", {}, 403);
    }

    const bloodRequest = new RecipientBloodRequest({
      bloodDonation: bloodDonationId,
      recipient: req.user.id,
      urgencyLevel,
      status: "pending",
      message: message || "", 
    });

    await bloodRequest.save();

    // req.io.emit("newBloodRequest", { bloodRequest });

    // await sendNotification(
    //   {
    //     target: "donor",
    //     excludeUser: req.user.id
    //   },

    //   "New Blood Request Created",
    //   "A new blood donation request has been submitted. Please review.",
    //   req.io
    // );

    return successResponse(res, "Blood request submitted successfully", { bloodRequest }, 201);
  } catch (err) {
    console.error("Blood request error:", err);
    return errorResponse(res, "Failed to submit blood request", { message: err.message }, 500);
  }
};


exports.getAllBloodDonations = async (req, res) => {
  try {
    const bloodDonations = await BloodDonation.find().populate("donor", "fullName email");
    return successResponse(res, "Blood donations retrieved successfully", { bloodDonations }, 200);
  } catch (err) {
    console.error("Failed to retrieve blood donations:", err);
    return errorResponse(res, "Failed to retrieve blood donations", { message: err.message }, 500);
  }
};


exports.getAvailableBloodDonations = async (req, res) => {
  try {
    if (req.user.role !== "recipient") {
      return errorResponse(res, "Only recipients can view available blood donations", {}, 403);
    }
    const availableBloodDonations = await BloodDonation.find({ status: "approved" }).populate("donor", "fullName email");
    return successResponse(res, "Available blood donations retrieved successfully", { availableBloodDonations }, 200);
  } catch (err) {
    console.error("Failed to retrieve available blood donations:", err);
    return errorResponse(res, "Failed to retrieve available blood donations", { message: err.message }, 500);
  }
};


exports.getUserBloodDonations = async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return errorResponse(res, "Only donors can view their blood donations", {}, 403);
    }

    const userDonations = await BloodDonation.find({ donor: req.user.id });
    return successResponse(res, "User blood donations retrieved successfully", { userDonations }, 200);
  } catch (err) {
    console.error("Error fetching user blood donations:", err);
    return errorResponse(res, "Failed to retrieve user donations", { message: err.message }, 500);
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
      return errorResponse(res, "Only admins can view blood requests", {}, 403);
    }
    // why checking in bloodDonationSchema?
    const bloodRequests = await BloodDonation.find({ recipient: { $ne: null } }).populate("recipient", "fullName email");
    return successResponse(res, "Blood requests retrieved successfully", { bloodRequests }, 200);
  } catch (err) {
    console.error("Error fetching blood requests:", err);
    return errorResponse(res, "Failed to retrieve blood requests", { message: err.message }, 500);
  }
};

exports.updateBloodDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { bloodGroup, lastDonationDate, weight, medicalConditions, recentSurgeries, consent } = req.body;

    const bloodDonation = await BloodDonation.findById(donationId);
    if (!bloodDonation) {
      return errorResponse(res, "Blood donation not found", {}, 404);
    }

    if (bloodDonation.donor.toString() !== req.user.id) {
      return errorResponse(res, "You can only update your own blood donations", {}, 403);
    }


    if (bloodGroup) bloodDonation.bloodGroup = bloodGroup;
    if (lastDonationDate) bloodDonation.lastDonationDate = lastDonationDate;
    if (weight) bloodDonation.weight = weight;
    if (medicalConditions) bloodDonation.medicalConditions = medicalConditions;
    if (recentSurgeries) bloodDonation.recentSurgeries = recentSurgeries;
    if (consent !== undefined) bloodDonation.consent = consent;

    await bloodDonation.save();

    // // ✅ Emit real-time event
    // req.io.emit("bloodDonationUpdated", { donationId: bloodDonation._id, bloodDonation });

    // // ✅ Send notification to the donor
    // await sendNotification(req.io, bloodDonation.donor, "Your blood donation details have been updated.");

    return successResponse(res, "Blood donation updated successfully", { bloodDonation });
  } catch (err) {
    console.error("Update blood donation error:", err);
    return errorResponse(res, "Failed to update blood donation", { message: err.message });
  }
};

exports.deleteBloodDonation = async (req, res) => {
  try {
    const { donationId } = req.params;

    const bloodDonation = await BloodDonation.findById(donationId);
    if (!bloodDonation) {
      return errorResponse(res, "Blood donation not found", {}, 404);
    }

    if (bloodDonation.donor.toString() !== req.user.id) {
      return errorResponse(res, "You can only delete your own blood donations", {}, 403);
    }

    await bloodDonation.deleteOne();

    // req.io.emit("bloodDonationDeleted", { donationId });

    // await sendNotification(req.io, bloodDonation.donor, "Your blood donation has been deleted.");

    return successResponse(res, "Blood donation deleted successfully");
  } catch (err) {
    console.error("Delete blood donation error:", err);
    return errorResponse(res, "Failed to delete blood donation", { message: err.message });
  }
};

exports.updateBloodDonationStatus = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return errorResponse(res, "Invalid status", {}, 400);
    }

    const bloodDonation = await BloodDonation.findById(donationId);
    if (!bloodDonation) {
      return errorResponse(res, "Blood donation not found", {}, 404);
    }

    // Only admin can change the status
    if (req.user.role !== "admin") {
      return errorResponse(res, "Only admins can update blood donation status", {}, 403);
    }

    bloodDonation.status = status;
    await bloodDonation.save();

    // // ✅ Emit real-time event
    // req.io.emit("bloodDonationStatusUpdated", {
    //   donationId: bloodDonation._id,
    //   status: bloodDonation.status,
    // });

    // // ✅ Send notification to the donor
    // await sendNotification(req.io, bloodDonation.donor, `Your blood donation status is now ${status}`);

    return successResponse(res, "Blood donation status updated successfully", bloodDonation);
  } catch (err) {
    console.error("Failed to update blood donation status:", err);
    return errorResponse(res, "Failed to update blood donation status", { message: err.message });
  }
};
