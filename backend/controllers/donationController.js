const Donation = require("../models/Donation");
const RecipientRequest = require("../models/RecipientRequest");
const sendNotification = require("../utils/sendNotification");

exports.createDonation = async (req, res) => {
  console.log(req.user.fullName);
  try {
    const { category, items, description, quantity, condition } = req.body;

    if (!category || !items || !quantity) {
      return res.status(400).json({ message: "Category, items, and quantity are required" });
    }

    if (req.user.role !== "donor") {
      return res.status(403).json({ message: "Only donors can submit donations" });
    }

    const donation = new Donation({
      donor: req.user.id,
      category,
      items,
      description,
      quantity,
      condition,
      status: "pending",
    });

    await donation.save();

    // ✅ Emit event using `req.io`
    req.io.emit("newDonation", {
      donation
    });

    await sendNotification(
      { target: "recipient", excludeUser: req.user.id },
      `A new donation has been made by ${req.user.fullName}!`,
      "donation_update",
      req.io
    );

    res.status(201).json({ message: "Donation submitted successfully", donation });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: "Failed to submit donation", error: err.message });
  }
};



exports.requestDonation = async (req, res) => {
  try {
    const { donationId, message } = req.body;

    if (!donationId) {
      return res.status(400).json({ message: "Donation ID is required" });
    }

    if (req.user.role !== "recipient") {
      return res.status(403).json({ message: "Only recipients can request donations" });
    }

    const donationRequest = new RecipientRequest({
      donation: donationId,
      recipient: req.user.id,
      status: "pending",
      message: message || "",
    });

    await donationRequest.save();

    res.status(201).json({ message: "Donation request submitted successfully", donationRequest });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit donation request", error: err.message });
  }
};



exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("donor", "fullName email");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve donations", error: err.message });
  }
};


exports.getAvailableDonations = async (req, res) => {
  try {
    if (req.user.role !== "recipient") {
      return res.status(403).json({ message: "Only recipients can view available donations" });
    }

    const donations = await Donation.find({ status: "approved" });

    res.status(200).json({ donations });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donations", error: err.message });
  }
};


/**
 * @desc Get all donations made by the logged-in donor
 * @route GET /api/donations/my-donations
 * @access Donor only
 */

exports.getUserDonations = async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(403).json({ message: "Only donors can view their donations" });
    }

    const userDonations = await Donation.find({ donor: req.user.id });
    res.json(userDonations);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve your donations", error: err.message });
  }
};

/**
 * @desc Get all general donation requests (Admin)
 * @route GET /api/donations/requests
 * @access Admin only
 */
exports.getDonationRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can view donation requests" });
    }

    const donationRequests = await Donation.find({ recipient: { $ne: null } }).populate("recipient", "fullName email");
    res.json(donationRequests);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve donation requests", error: err.message });
  }
};


exports.updateDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { category, items, description, quantity, condition } = req.body;

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own donations" });
    }

    if (category) donation.category = category;
    if (items) donation.items = items;
    if (description) donation.description = description;
    if (quantity) donation.quantity = quantity;
    if (condition) donation.condition = condition;

    await donation.save();

    res.json({ message: "Donation updated successfully", donation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update donation", error: err.message });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own donations" });
    }

    await donation.deleteOne();

    req.io.emit("donationDeleted", { donationId });


    await sendNotification(
      { target: "all", excludeUser: donation.donor },
      `Donation made by ${req.user.fullName} has been deleted!`,
      "donation_update",
      req.io
    );

    res.json({ message: "Donation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete donation", error: err.message });
  }
};

exports.updateDonationStatus = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const donation = await Donation.findById(donationId).populate("donor", "fullName email");
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = status;
    await donation.save();

    req.io.emit("donationStatusUpdated", {
      donationId: donation._id,
      status: donation.status,
      donor: donation.donor.fullName,
    });

    await sendNotification(
      { target: req.user.id, excludeUser: null },
      `Your donation status has changed to ${status}.`,
      "donation_update",
      req.io
    );

    res.json({ message: "Donation status updated", donation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update donation status", error: err.message });
  }
};
