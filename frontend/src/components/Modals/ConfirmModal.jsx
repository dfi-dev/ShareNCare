import { motion, AnimatePresence } from "framer-motion";
import { FaGem, FaShieldAlt, FaFire, FaAtom } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title = "Celestial Confirmation",
  message = "This action will alter cosmic balance",
  confirmText = "Accept Destiny",
  cancelText = "Reject Fate",
  type = "crystal"
}) => {
  const typeStyles = {
    crystal: {
      icon: <FaGem className="text-purple-500" />,
      button: "bg-purple-600 hover:bg-purple-700",
    },
    shield: {
      icon: <FaShieldAlt className="text-emerald-500" />,
      button: "bg-emerald-600 hover:bg-emerald-700",
    },
    inferno: {
      icon: <FaFire className="text-amber-500" />,
      button: "bg-amber-600 hover:bg-amber-700",
    },
    quantum: {
      icon: <FaAtom className="text-cyan-500" />,
      button: "bg-cyan-600 hover:bg-cyan-700",
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.crystal;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm px-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 350,
              mass: 0.7
            }}
            className="relative w-full max-w-md rounded-2xl bg-white p-4 sm:p-8 border border-gray-300"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-gray-600 hover:text-black transition-all"
            >
              <IoClose className="text-2xl" />
            </motion.button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto mb-2 flex items-center justify-center w-16 h-14"
            >
              <div className="text-3xl">{currentStyle.icon}</div>
            </motion.div>

            {/* Title & Message */}
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{message}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row sm:flex-row justify-center gap-3 sm:gap-4 mt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-white font-medium ${currentStyle.button} transition-colors`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
