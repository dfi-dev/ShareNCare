import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiCheck, FiRotateCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const OTPModal = ({
  onVerify = async (otp) => {
    console.log("Default verification for:", otp);
    return otp === "123456"; // Default test OTP
  },
  onClose
}) => {
  const otpRefs = Array(6).fill().map(() => useRef());
  const [isResending, setIsResending] = useState(false);
  const [shake, setShake] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showResentMessage, setShowResentMessage] = useState(false);
  const [lastWrongOTP, setLastWrongOTP] = useState(null);
  const controls = useAnimation();
  const navigate = useNavigate();

  const handleInput = (index, e) => {
    const { value } = e.target;
    if (value.match(/[0-9]/)) {
      e.target.value = value[value.length - 1];
      if (index < 5) otpRefs[index + 1].current.focus();
    } else if (e.nativeEvent.inputType === 'deleteContentBackward' && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const clearOTP = () => {
    otpRefs.forEach(ref => {
      if (ref.current) ref.current.value = "";
    });
    otpRefs[0]?.current?.focus();
  };

  const handleVerificationFailure = (otp) => {
    setIsVerified(false);
    setLastWrongOTP(otp);
    setShake(true);
    clearOTP();
    setTimeout(() => setShake(false), 500);
  };

  const handleInvalidOTP = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpRefs.map(ref => ref.current.value).join('');

    if (otp.length !== 6) {
      handleInvalidOTP();
      return;
    }

    if (lastWrongOTP === otp) {
      handleVerificationFailure(otp);
      return;
    }

    try {
      const verificationResult = await onVerify(otp);

      if (verificationResult === true) {
        setIsVerified(true); // ✅ only when successful

        // Animate checkmark
        await controls.start({
          scale: [0.5, 1.2, 1],
          opacity: [0, 1],
          transition: { duration: 0.5 }
        });

        await controls.start({
          scale: 1,
          transition: { duration: 0.2 }
        });

        setTimeout(() => {
          onClose();
          navigate('/success-page');
        }, 1000);
      } else {
        handleVerificationFailure(otp);
      }
    } catch (error) {
      console.error("Verification error:", error);
      handleVerificationFailure(otp);
    }
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setShowResentMessage(true);
      setTimeout(() => setShowResentMessage(false), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden"
          layout
        >
          {isVerified ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={controls}
                className="mb-6"
              >
                <FiCheck className="mx-auto h-16 w-16 text-green-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Verified!</h3>
                <p className="text-gray-600">Redirecting you...</p>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <div className="p-8 pb-6">
                <div className="flex justify-between items-start">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800">Verification</h2>
                    <p className="text-gray-500 mt-2">Enter the 6-digit code sent to your email</p>
                  </motion.div>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="mt-8"
                  animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center gap-3 mb-8">
                    {otpRefs.map((ref, index) => (
                      <motion.input
                        key={index}
                        ref={ref}
                        required
                        maxLength={1}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-12 h-14 text-2xl font-bold text-center bg-white border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                        onChange={(e) => handleInput(index, e)}
                        onKeyDown={(e) => !e.key.match(/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight/) && e.preventDefault()}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.05, type: 'spring' }}
                      />
                    ))}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Verify Code
                  </motion.button>
                </motion.form>

                <div className="h-8 flex items-center justify-center mt-6">
                  <AnimatePresence mode="wait">
                    {showResentMessage ? (
                      <motion.div
                        key="resent-message"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-green-600 font-medium text-sm"
                      >
                        Code resent successfully!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="resend-button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-gray-500"
                      >
                        Didn't receive code?{' '}
                        <motion.button
                          type="button"
                          onClick={handleResend}
                          disabled={isResending}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline focus:outline-none px-2 py-1 -mx-2"
                        >
                          {isResending ? (
                            <span className="inline-flex items-center gap-2">
                              <FiRotateCw className="animate-spin h-4 w-4" />
                              Sending...
                            </span>
                          ) : (
                            "Resend OTP"
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                className="h-1.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

OTPModal.propTypes = {
  onVerify: PropTypes.func,
  onClose: PropTypes.func.isRequired
};

export default OTPModal;
