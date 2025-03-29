const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/**
 * Generates a JWT token with dynamic payload and expiration time
 * @param {Object} payload - The payload to include in the token
 * @param {string} expiresIn - Expiration time (e.g., "1h", "24h", "7d")
 * @returns {string} - JWT token
 */
const generateJWTToken = (payload, expiresIn = "24h") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Generates a secure password reset token and returns both the raw and hashed token
 * @returns {Object} { resetToken, resetTokenHash }
 */
const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
  
  return { resetToken, resetTokenHash };
};

module.exports = {
  generateJWTToken,
  generatePasswordResetToken
};
