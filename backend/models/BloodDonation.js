const mongoose = require("mongoose");

const bloodDonationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    bloodGroup: { 
      type: String, 
      required: true, 
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] 
    },
    lastDonationDate: { type: Date }, 
    weight: { type: Number, required: true, min: 50 }, 
    medicalConditions: { type: String, default: "" },
    recentSurgeries: { type: String, default: "" }, 
    consent: { type: Boolean, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" }
  },
  { timestamps: true }
);

const BloodDonation = mongoose.models.BloodDonation || mongoose.model("BloodDonation", bloodDonationSchema);

module.exports = BloodDonation;
