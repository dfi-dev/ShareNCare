const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 600 });
const generateOTP = require('../utils/generateOTP');

async function storeOTP(email, otp) {
    try {
        myCache.set(`otp:${email}`, otp);
        console.log('OTP stored successfully in Node-cache');
    } catch (error) {
        console.error('❌ Error storing OTP:', error);
    }
}

async function verifyOTP(email, enteredOTP) {
    try {
        const storedOTP = myCache.get(`otp:${email}`);
        if (!storedOTP) {
            console.log('OTP expired or not found');
            return false;
        }

        if (storedOTP === enteredOTP) {
            myCache.del(`otp:${email}`); 
            console.log('OTP verified and cleared successfully');
            return true;
        } else {
            console.log('Incorrect OTP');
            return false;
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
}

module.exports = { generateOTP, storeOTP, verifyOTP };
