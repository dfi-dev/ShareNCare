import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { GoAlertFill } from "react-icons/go";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

const Modal = ({ type = "error", message = "Something went wrong!", onClose, autoClose = 6000 }) => {
    useEffect(() => {
        if (autoClose) {
            const closeTimer = setTimeout(() => {
                onClose();
            }, autoClose);
            return () => clearTimeout(closeTimer);
        }
    }, [onClose, autoClose]);

    const types = {
        error: { 
            icon: <MdErrorOutline className="w-12 h-12" />,
            colors: {
                bg: "bg-red-50",
                border: "border-red-200",
                icon: "text-red-500",
                button: "bg-red-500 hover:bg-red-600",
                progress: "bg-red-500"
            }
        },
        success: { 
            icon: <IoMdCheckmarkCircle className="w-12 h-12" />,
            colors: {
                bg: "bg-green-50",
                border: "border-green-200",
                icon: "text-green-500",
                button: "bg-green-500 hover:bg-green-600",
                progress: "bg-green-500"
            }
        },
        alert: { 
            icon: <GoAlertFill className="w-12 h-12" />,
            colors: {
                bg: "bg-yellow-50",
                border: "border-yellow-200",
                icon: "text-yellow-500",
                button: "bg-yellow-500 hover:bg-yellow-600",
                progress: "bg-yellow-500"
            }
        },
    };

    const currentType = types[type] || types.error;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[100]">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className={`relative max-w-md w-full rounded-xl shadow-2xl border ${currentType.colors.border} ${currentType.colors.bg} overflow-hidden`}
                >
                    {/* Auto-close progress bar */}
                    {autoClose && (
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: 0 }}
                            transition={{ duration: autoClose / 1000, ease: "linear" }}
                            className={`h-1 ${currentType.colors.progress}`}
                        />
                    )}

                    <div className="p-6">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Icon */}
                        <div className={`flex justify-center ${currentType.colors.icon}`}>
                            {currentType.icon}
                        </div>

                        {/* Message */}
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {type === "error" && "Error"}
                                {type === "success" && "Success"}
                                {type === "alert" && "Notice"}
                            </h3>
                            <p className="mt-2 text-gray-600 break-words">
                                {message}
                            </p>
                        </div>

                        {/* Action button */}
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={onClose}
                                className={`px-5 py-2 rounded-lg text-white font-medium transition-colors ${currentType.colors.button}`}
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;