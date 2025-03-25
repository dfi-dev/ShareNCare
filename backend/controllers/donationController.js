const Donation = require("../models/Donation");
const sendNotification = require("../utils/sendNotification");

exports.createDonation = async (req, res) => {
  console.log(req.user.fullName)
  try {
    // console.log("Request received:", req.body);

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
  // ✅ Emit event with full name
  global.io.emit("newDonation", {
    donationId: donation._id,
    donor: req.user.fullName, // ✅ Now using fetched full name
    category,
    items,
  });

  // ✅ Send real-time notification
  await sendNotification(req.user.id, "Your donation has been submitted!");
  
  res.status(201).json({ message: "Donation submitted successfully", donation });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: "Failed to submit donation", error: err.message });
  }
};


exports.requestDonation = async (req, res) => {
  try {
    const { category, items, quantity } = req.body;

    if (!category || !items || !quantity) {
      return res.status(400).json({ message: "Category, items, and quantity are required" });
    }

    if (req.user.role !== "recipient") {
      return res.status(403).json({ message: "Only recipients can request donations" });
    }

    const donationRequest = new Donation({
      recipient: req.user.id,
      category,
      items,
      quantity,
      status: "pending",
    });

    await donationRequest.save();
    res.status(201).json({ message: "Donation request submitted successfully", donationRequest });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit request", error: err.message });
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

    // Find the donation
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Ensure only the donor can delete their donation
    if (donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own donations" });
    }

    // Delete the donation
    await donation.deleteOne();

    // ✅ Emit real-time update
    req.io.emit("donationDeleted", { donationId });

    // ✅ Send notification
    await sendNotification(req.io, donation.donor, "Your donation has been deleted.");

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

    // ✅ Emit real-time event to update all connected users
    req.io.emit("donationStatusUpdated", {
      donationId: donation._id,
      status: donation.status,
      donor: donation.donor.fullName,
    });

    // ✅ Save notification in database (optional)
    await sendNotification(
      donation.donor._id,
      `Your donation status has changed to ${status}.`
    );

    res.json({ message: "Donation status updated", donation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update donation status", error: err.message });
  }
};
