const { generateOTP, storeOTP, verifyOTP } = require('../services/otpService');
const sendEmail = require("../utils/sendEmail");
const getEmailTemplate = require("../templates/emailTemplate");
const emailContent = require("../templates/emailContent");
const { successResponse, errorResponse } = require('../utils/responseHelper.js');


// Send OTP
exports.sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return errorResponse(res, 'Email is required', {}, 400);
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

        return successResponse(res, 'OTP sent successfully!', {}, 200);

    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
};


// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return errorResponse(res, 'Email and OTP are required', {}, 400);
    }

    try {
        const isValid = await verifyOTP(email, otp);

        if (isValid) {
            return successResponse(res, 'OTP verified successfully!', {}, 200);
        } else {
            return errorResponse(res, 'Invalid or expired OTP', {}, 400);
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return errorResponse(res, "Failed to verify OTP", { error: error.message }, 500);
    }
};
