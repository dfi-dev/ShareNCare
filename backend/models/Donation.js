const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.Mixed, ref: "User", required: true }, 
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    category: { 
      type: String, 
      enum: ["clothes", "food", "stationery", "household"], 
      required: true 
    },
    items: [{ type: String, required: true }],
    description: { type: String, default: "" },
    quantity: { type: Number, required: true, min: 1 },
    condition: { type: String, enum: ["new", "used"], default: "new" },
    status: { 
      type: String, 
      enum: ["pending", "approved", "completed"], 
      default: "pending"
    }
  },
  { timestamps: true }
);

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);

module.exports = Donation;
