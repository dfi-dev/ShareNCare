const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
