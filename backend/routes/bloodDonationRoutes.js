const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createBloodDonation, requestBlood, getAllBloodDonations, getUserBloodDonations, updateBloodDonation,updateBloodDonationStatus, deleteBloodDonation, getBloodRequests } = require("../controllers/bloodDonationController");

// Donor donates blood
router.post("/donate", authMiddleware, createBloodDonation);

// Recipient requests blood
router.post("/request", authMiddleware, requestBlood);

// Get all blood donations (Admin/Recipient)
router.get("/", authMiddleware, getAllBloodDonations);

// Get blood donations of logged-in donor
router.get("/my-blood-donations", authMiddleware, getUserBloodDonations);

// Get all blood requests (Admin)
router.get("/requests", authMiddleware, getBloodRequests);

// Update blood donation status (Admin Only)
router.patch("/:donationId/status", authMiddleware, updateBloodDonationStatus);

// Update blood donation details (Donor Only)
router.put("/:donationId", authMiddleware, updateBloodDonation);

// Delete blood donation (Donor Only)
router.delete("/:donationId", authMiddleware, deleteBloodDonation);


module.exports = router;
