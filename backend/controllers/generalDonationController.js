const GeneralDonation = require("../models/GeneralDonation");
const RecipientGeneralRequest = require("../models/RecipientGeneralRequest");
const sendNotification = require("../utils/sendNotification");
const { successResponse, errorResponse } = require('../utils/responseHelper.js');

exports.createGeneralDonation = async (req, res) => {
  try {
    const { category, items, description, quantity, condition } = req.body;

    if (!category || !items || !quantity) {
      return errorResponse(res, "Category, items, and quantity are required", {}, 400);
    }

    if (req.user.role !== "donor") {
      return errorResponse(res, "Only donors can submit a general donation", {}, 403);
    }

    const generalDonation = new GeneralDonation({
      donor: req.user.id,
      category,
      items,
      description,
      quantity,
      condition,
      status: "pending",
    });

    await generalDonation.save();

    // // ✅ Emit event using `req.io`
    // req.io.emit("newGeneralDonation", {
    //   generalDonation
    // });

    // await sendNotification(
    //   { target: "recipient", excludeUser: req.user.id },
    //   `A new general donation has been made by ${req.user.fullName}!`,
    //   "donation_update",
    //   req.io
    // );

    return successResponse(res, "General donation submitted", { generalDonation }, 201);

  } catch (err) {
    console.error("Donation error:", err);
    return errorResponse(res, "Failed to submit general donation", { error: err.message }, 500);
  }
};



exports.requestGeneral = async (req, res) => {
  try {
    const { donationId, message } = req.body;

    if (!donationId) {
      return errorResponse(res, "General Donation ID is required", {}, 400);
    }

    if (req.user.role !== "recipient") {
      return errorResponse(res, "Only recipients can request donations", {}, 403);
    }

    const generalRequest = new RecipientGeneralRequest({
      donation: donationId,
      recipient: req.user.id,
      status: "pending",
      message: message || "",
    });

    await generalRequest.save();

    return successResponse(res, "General request submitted successfully", { generalRequest }, 201);
  } catch (err) {
    console.error("Donation request error:", err);
    return errorResponse(res, "Failed to submit general request", { error: err.message }, 500);
  }
};



exports.getAllGeneralDonations = async (req, res) => {
  try {
    const donations = await GeneralDonation.find().populate("donor", "fullName email");
    return successResponse(res, "General donations retrieved successfully", { donations }, 200);
  } catch (err) {
    return errorResponse(res, "Failed to retrieve general donations", { error: err.message }, 500);
  }
};


exports.getAvailableGeneralDonations = async (req, res) => {
  try {
    if (req.user.role !== "recipient") {
      return errorResponse(res, "Only recipients can view available general donations", {}, 403);
    }

    const availableGeneralDonations = await GeneralDonation.find({ status: "approved" });

    return successResponse(res, "Available donations fetched successfully", { availableGeneralDonations }, 200);
  } catch (err) {
    console.error("Error fetching donations:", err);
    return errorResponse(res, "Failed to fetch donations", { error: err.message }, 500);
  }
};


/**
 * @desc Get all donations made by the logged-in donor
 * @route GET /api/donations/my-donations
 * @access Donor only
 */

exports.getUserGeneralDonations = async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return errorResponse(res, "Only donors can view their general donations", {}, 403);
    }

    const userDonations = await GeneralDonation.find({ donor: req.user.id });
    return successResponse(res, "User general donations retrieved successfully", { donations: userDonations }, 200);
  } catch (err) {
    console.error("Error retrieving user general donations:", err);
    return errorResponse(res, "Failed to retrieve user general donations", { error: err.message }, 500);
  }
};

/**
 * @desc Get all general donation requests (Admin)
 * @route GET /api/donations/requests
 * @access Admin only
 */
exports.getGeneralRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return errorResponse(res, "Only admins can view general requests", {}, 403);
    }
    // why checking in generalDonationSchema?
    const donationRequests = await GeneralDonation.find({ recipient: { $ne: null } }).populate("recipient", "fullName email");
    return successResponse(res, "General requests retrieved successfully", { donationRequests });
  } catch (err) {
    console.error("Error fetching general requests:", err);
    return errorResponse(res, "Failed to retrieve general requests", { error: err.message }, 500);
  }
};


exports.updateGeneralDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { category, items, description, quantity, condition } = req.body;

    const generalDonation = await GeneralDonation.findById(donationId);
    if (!generalDonation) {
      return errorResponse(res, "General donation not found", {}, 404);
    }

    if (generalDonation.donor.toString() !== req.user.id) {
      return errorResponse(res, "You can only update your own general donations", {}, 403);
    }

    if (category) generalDonation.category = category;
    if (items) generalDonation.items = items;
    if (description) generalDonation.description = description;
    if (quantity) generalDonation.quantity = quantity;
    if (condition) generalDonation.condition = condition;

    await generalDonation.save();

    return successResponse(res, "General donation updated successfully", { generalDonation }, 200);
  } catch (err) {
    console.error("Update general donation error:", err);
    return errorResponse(res, "Failed to update general donation", { error: err.message }, 500);
  }
};

exports.deleteGeneralDonation = async (req, res) => {
  try {
    const { donationId } = req.params;

    const generalDonation = await GeneralDonation.findById(donationId);
    if (!generalDonation) {
      return errorResponse(res, "General donation not found", {}, 404);
    }

    if (generalDonation.donor.toString() !== req.user.id) {
      return errorResponse(res, "You can only delete your own general donations", {}, 403);
    }

    await generalDonation.deleteOne();

    // req.io.emit("generalDonationDeleted", { donationId });


    // await sendNotification(
    //   { target: "all", excludeUser: generalDonation.donor },
    //   `Donation made by ${req.user.fullName} has been deleted!`,
    //   "donation_update",
    //   req.io
    // );

    return successResponse(res, "General donation deleted successfully", { donationId }, 200);
  } catch (err) {
    console.error("Delete general donation error:", err);
    return errorResponse(res, "Failed to delete general donation", { error: err.message }, 500);
  }
};

exports.updateGeneralDonationStatus = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return errorResponse(res, "Invalid status", {}, 400);
    }

    const generalDonation = await GeneralDonation.findById(donationId)
    if (!generalDonation) {
      return errorResponse(res, "General donation not found", {}, 404);
    }

    // Only admin can change the status
    if (req.user.role !== "admin") {
      return errorResponse(res, "Only admins can update general donation status", {}, 403);
    }

    generalDonation.status = status;
    await generalDonation.save();

    // req.io.emit("generalDonationStatusUpdated", {
    //   donationId: generalDonation._id,
    //   status: generalDonation.status,
    //   donor: generalDonation.donor.fullName,
    // });

    // await sendNotification(
    //   { target: req.user.id, excludeUser: null },
    //   `Your donation status has changed to ${status}.`,
    //   "donation_update",
    //   req.io
    // );

    return successResponse(res, "General donation status updated successfully", { donation: generalDonation });
  } catch (err) {
    console.error("General donation status update error:", err);
    return errorResponse(res, "Failed to update general donation status", { error: err.message }, 500);
  }
};
