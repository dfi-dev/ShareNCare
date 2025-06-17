import { useEffect, useState } from "react";
import { IoFingerPrint } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const circleDelays = [0, 0.2, 0.4, 0.6, 0.8];

const AuthLoader = ({ active, onComplete }) => {
  const [status, setStatus] = useState("loading");
  const [isVisible, setIsVisible] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  
  const loadingMessages = [
    "Authenticating...",
    "Please wait, authenticating",
    "Validating access",
    "Verifying your identity",
    "Just a moment...",
    "Please wait again"
  ];

  useEffect(() => {
    if (active) {
      setIsVisible(true);
      setStatus("loading");
      
      // Cycle through loading messages every 0.7 seconds
      const messageInterval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 700);

      const authTimer = setTimeout(() => {
        const result = Math.random() > 0.3 ? "success" : "success";
        setStatus(result);
        clearInterval(messageInterval);

        const closeTimer = setTimeout(() => {
          setIsVisible(false);
          onComplete(result === "success");
        }, 5000);

        return () => clearTimeout(closeTimer);
      }, 5000);

      return () => {
        clearTimeout(authTimer);
        clearInterval(messageInterval);
      };
    } else {
      setIsVisible(false);
    }
  }, [active, onComplete]);

  // Animation variants
  const ringVariants = {
    animate: (customDelay = 0) => ({
      scale: [1, 1.5, 2],
      opacity: [0.8, 0.4, 0],
      transition: {
        delay: customDelay,
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  // Dynamic styling
  let buttonBg = "bg-gradient-to-br from-blue-500 to-indigo-600";
  let message = loadingMessages[loadingMessageIndex];
  let statusMessage = "";
  
  if (status === "success") {
    buttonBg = "bg-gradient-to-br from-emerald-400 to-teal-500";
    message = "Access Granted";
    statusMessage = "Redirecting you..";
  } else if (status === "error") {
    buttonBg = "bg-gradient-to-br from-rose-500 to-pink-600";
    message = "Access Denied";
    statusMessage = "Authentication failed";
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`
              relative overflow-hidden
              flex flex-col items-center justify-center
              min-w-[350px] h-[250px] lg:min-w-[450px] lg:h-[300px] rounded-xl
              text-white font-medium
              transition-all duration-300
              shadow-xl
              ${buttonBg}
            `}
          >
            {/* Background shimmer effect */}
            {status === "loading" && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 500, opacity: 0.4 }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "linear",
                  delay: 0.5
                }}
                className="absolute top-0 left-0 w-24 h-full bg-white/30 -skew-x-12"
              />
            )}

            <div className="relative h-28 w-28 mb-4 flex items-center justify-center">
              {/* Pulsating rings in loading state */}
              {status === "loading" &&
                circleDelays.map((delay, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-2 border-white/50"
                    custom={delay}
                    variants={ringVariants}
                    animate="animate"
                    style={{ width: "100%", height: "100%" }}
                  />
                ))}

              {/* Fingerprint icon always visible */}
              <IoFingerPrint className="absolute text-7xl text-white" />
            </div>

            {/* Animated status text */}
            <AnimatePresence mode="wait">
              <motion.div className={`flex flex-col items-center ${status === "loading" ? "mt-8" : ""}`}>
                <motion.span
                  key={status === "loading" ? loadingMessageIndex : status}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-xl font-semibold tracking-wide"
                >
                  {message}
                </motion.span>
                {(status === "success" || status === "error") && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm mt-1"
                  >
                    {statusMessage}
                  </motion.span>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthLoader;