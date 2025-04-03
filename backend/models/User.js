const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        googleId: { type: String, unique: true, sparse: true }, // ✅ Google OAuth users only
        isOAuthUser: { type: Boolean, default: false }, // ✅ Distinguish OAuth users

        role: { type: String, enum: ["admin", "donor", "recipient"], default: "donor", required: true },

        phone: { 
            type: String, 
            required: function() { return !this.isOAuthUser; } // ✅ Only required for non-OAuth users
        },
        address: { 
            type: String, 
            required: function() { return !this.isOAuthUser; } 
        },
        dob: { 
            type: Date, 
            required: function() { return !this.isOAuthUser; } 
        },
        gender: { 
            type: String, 
            enum: ["male", "female", "other", "Not specified"], 
            required: function() { return !this.isOAuthUser; } 
        },

        password: { 
            type: String, 
            required: function() { return !this.isOAuthUser; } // ❌ Not required for OAuth users
        },

        notificationPreferences: {
            donationUpdates: { type: Boolean, default: true },
            statusChanges: { type: Boolean, default: true }
        },

        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        isEmailConfirmed: { type: Boolean, default: false },
        emailConfirmationToken: { type: String, default: null }
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
