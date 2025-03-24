const express = require("express");
const { createDonation, getDonations } = require("../controllers/donationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createDonation);
router.get("/", getDonations);

module.exports = router;
