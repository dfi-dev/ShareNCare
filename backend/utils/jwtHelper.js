const jwt = require("jsonwebtoken");

const generateToken = (user, expiresIn = "7d") => {
  return jwt.sign(
    { id: user._id, fullName:user.fullName, role: user.role }, // Change userId to id
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

module.exports = generateToken;
