const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createGeneralDonation, requestGeneral, getAllGeneralDonations, getAvailableGeneralDonations, updateGeneralDonation, deleteGeneralDonation, updateGeneralDonationStatus, getUserDonations, getGeneralRequests } = require("../controllers/donationController");

// Donor donates general items
router.post("/donate", authMiddleware, createGeneralDonation);

// Recipient requests general donations
router.post("/request", authMiddleware, requestGeneral);

// Get all general donations (Admin/Recipient)
router.get("/", authMiddleware, getAllGeneralDonations);

// Get general donations of logged-in donor
router.get("/my-donations", authMiddleware, getUserDonations);

// Get all general donation requests (Admin)
router.get("/requests", authMiddleware, getGeneralRequests);

// Fetch approved donations (only for recipients)
router.get("/available", authMiddleware, getAvailableGeneralDonations);

// Update donation status (Admin or authorized users)
router.patch("/:donationId/status", authMiddleware, updateGeneralDonationStatus);

// Update a donation (only donor can modify their own donation)
router.put("/:donationId", authMiddleware, updateGeneralDonation);

// Delete a donation (only donor can delete their own donation)
router.delete("/:donationId", authMiddleware, deleteGeneralDonation);

module.exports = router;
