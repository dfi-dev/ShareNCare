import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import {GoAlertFill} from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const Modal = ({ type = "error", message = "Something went wrong!", onClose }) => {
    useEffect(() => {
        const closeTimer = setTimeout(() => {
            onClose();
        }, 6000);

        return () => {
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    const types = {
        error: { icon: < MdOutlineClose className="text-red-500" />, border: "border-red-500/50", buttonColor: "from-pink-500 to-red-500" },
        success: { icon: <IoMdCheckmarkCircleOutline className="text-green-500" />, border: "border-green-500/50", buttonColor: "from-emerald-500 to-cyan-500" },
        alert: { icon: <GoAlertFill className="text-yellow-500" />, border: "border-yellow-500/50", buttonColor: "from-yellow-500 to-orange-400" },
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative min-w-[300px] sm:min-w-[400px] md:min-w-[500px] px-8 py-8 rounded-lg shadow-2xl border border-gray-200 bg-white"
            >
                <div className="flex flex-col items-center text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-transform transform hover:scale-110"
                    >
                        <X size={22} />
                    </button>

                    <div className="text-4xl">{types[type].icon}</div>

                    <p className="text-lg font-semibold text-gray-800 mt-3 break-words">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={`mt-4 px-6 py-2 bg-gradient-to-r ${types[type].buttonColor} text-white rounded-md transition`}
                    >
                        Ok
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;