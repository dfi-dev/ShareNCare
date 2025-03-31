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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-lg shadow-lg p-8 border border-gray-300 min-w-[300px] sm:min-w-[400px] md:min-w-[500px] max-w-[90%] text-center"
            >
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-lg text-gray-700">Loading, please wait...</p>
            </motion.div>
        </div>
    );
};

export default Modal;
