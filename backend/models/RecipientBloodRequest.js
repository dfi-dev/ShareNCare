const mongoose = require("mongoose");

const RecipientBloodRequestSchema = new mongoose.Schema(
  {
    bloodDonation: { type: mongoose.Schema.Types.ObjectId, ref: "BloodDonation", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected", "completed"], 
      default: "pending" 
    },
    urgencyLevel: { 
      type: String, 
      enum: ["low", "medium", "high"], 
      required: true 
    },
    requestDate: { type: Date, default: Date.now }, 
    approvedDate: { type: Date }, 
    completedDate: { type: Date }, 
    message: { type: String, default: "" } 
  },
  { timestamps: true }
);

const RecipientBloodRequest = mongoose.models.RecipientBloodRequest ||  mongoose.model("RecipientBloodRequest", RecipientBloodRequestSchema);

module.exports = RecipientBloodRequest;
