const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        role: { type: String, enum: ["admin", "donor", "recipient"], required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ["male", "female", "other"], required: true },
        password: { type: String, required: true },

        notificationPreferences: {
            donationUpdates: { type: Boolean, default: true },
            statusChanges: { type: Boolean, default: true }
        },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        isEmailConfirmed: { type: Boolean, default: false },
        emailConfirmationToken: { type: String, default: null },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
