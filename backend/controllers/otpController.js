const { generateOTP, storeOTP, verifyOTP } = require('../services/otpService');
const sendEmail = require("../utils/sendEmail");
const getEmailTemplate = require("../templates/emailTemplate");
const emailContent = require("../templates/emailContent");

// Send OTP
exports.sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const otp = generateOTP();
        await storeOTP(email, otp);

        // 💡 Use the actual recipient's email
        const otpHTML = getEmailTemplate(
            "Sir/Madam",
            emailContent.OTP_VERIFICATION.title,
            `Your OTP is: <strong>${otp}</strong>.<br>${emailContent.OTP_VERIFICATION.message}`,
            emailContent.OTP_VERIFICATION.buttonText
        );

        await sendEmail(
            email,
            emailContent.OTP_VERIFICATION.title,
            otpHTML
        );

        res.status(200).json({ message: 'OTP sent successfully!' });

    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
};


// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    try {
        const isValid = await verifyOTP(email, otp);

        if (isValid) {
            res.status(200).json({ message: 'OTP verified successfully!' });
        } else {
            res.status(400).json({ error: 'Invalid or expired OTP' });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
};
