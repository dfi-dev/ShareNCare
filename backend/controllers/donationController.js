const Donation = require("../models/Donation");
const sendNotification = require("../utils/sendNotification");

exports.createDonation = async (req, res) => {
  try {
    const donation = await Donation.create({ ...req.body, donorId: req.user.id });
    sendNotification(req.user.id, "Thank you for your donation!");
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: "Donation failed", error: err.message });
  }
};

exports.getDonations = async (req, res) => {
  const donations = await Donation.find().populate("donorId", "name email");
  res.json(donations);
};
