const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createDonation, requestDonation, getAllDonations, updateDonation,deleteDonation, updateDonationStatus, getUserDonations, getDonationRequests } = require("../controllers/donationController");

// Donor donates general items
router.post("/donate", authMiddleware, createDonation);

// Recipient requests general donations
router.post("/request", authMiddleware, requestDonation);

// Get all general donations (Admin/Recipient)
router.get("/", authMiddleware, getAllDonations);

// Get general donations of logged-in donor
router.get("/my-donations", authMiddleware, getUserDonations);

// Get all general donation requests (Admin)
router.get("/requests", authMiddleware, getDonationRequests);

// Update donation status (Admin or authorized users)
router.patch("/:donationId/status", authMiddleware, updateDonationStatus);

// Update a donation (only donor can modify their own donation)
router.put("/:donationId", authMiddleware, updateDonation);

// Delete a donation (only donor can delete their own donation)
router.delete("/:donationId", authMiddleware, deleteDonation);

module.exports = router;
