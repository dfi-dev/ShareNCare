const mongoose = require("mongoose");

const RecipientGeneralRequestSchema = new mongoose.Schema(
  {
    donation: { type: mongoose.Schema.Types.ObjectId, ref: "Donation", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected", "completed"], 
      default: "pending" 
    },
    message: { type: String, default: "" }, // Optional message from recipient
    requestDate: { type: Date, default: Date.now }, // Timestamp for request creation
    approvedDate: { type: Date }, // Tracks when the request was approved
    completedDate: { type: Date } // Tracks when the donation was marked as completed
  },
  { timestamps: true }
);

const RecipientGeneralRequest = mongoose.models.RecipientGeneralRequest || mongoose.model("RecipientGeneralRequest", RecipientGeneralRequestSchema);

module.exports = RecipientGeneralRequest;
