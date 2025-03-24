import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import {GiCrossMark} from "react-icons/gi";
import {TfiCheckBox} from "react-icons/tfi";
import {GoAlertFill} from "react-icons/go";


const Modal = ({ type = "error", message = "Something went wrong!", onClose}) => {

    useEffect(() => {
        // Auto-close after 4 seconds
        const closeTimer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => {
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    // Icon & Styling Configurations
    const types = {
        error: { icon: <GiCrossMark className="text-red-500" />, border: "border-red-500/50", buttonColor: "from-pink-500 to-red-500" },
        success: { icon: <TfiCheckBox className="text-green-500" />, border: "border-green-500/50", buttonColor: "from-emerald-500 to-cyan-500" },
        alert: { icon: <GoAlertFill  className="text-yellow-500" />, border: "border-yellow-500/50", buttonColor: "from-yellow-500 to-orange-400" },
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-[90%] sm:max-w-[400px] px-10 py-10 rounded-lg shadow-2xl border border-gray-200 bg-white"
            >
                <div className="flex flex-col items-center text-center">
                    {/* Close AnimatedButton */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-transform transform hover:scale-110"
                    >
                        <X size={22} />
                    </button>

                    {/* Icon */}
                    <div className="text-4xl">{types[type].icon}</div>

                    {/* Message */}
                    <p className="text-lg font-semibold text-gray-800 mt-3">{message}</p>

                    {/* Close AnimatedButton */}
                    <button
                        onClick={onClose}
                        className={`mt-4 px-4 py-[5px] bg-gradient-to-r ${types[type].buttonColor}  text-white rounded-md transition`}
                    >Ok
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
