const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["food", "blood", "money"], required: true },
  amount: Number,
  status: { type: String, enum: ["pending", "completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Donation", DonationSchema);
