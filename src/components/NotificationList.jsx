import React from "react";
import { motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5"; // Close icon
import { IoClose } from "react-icons/io5"; // Individual notification delete icon

const NotificationList = ({ notifications, onClose, onDelete }) => {
    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}  // Start off-screen (right)
            animate={{ x: 0, opacity: 1 }}       // Slide in to the left (visible)
            exit={{ x: "100%", opacity: 0 }}     // Slide back to right when closed
            transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth animation
            className="absolute right-0 top-12 w-80 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-lg p-4 border border-gray-200 z-10"
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-700">🔔 Notifications</h3>
                <button
                    className="text-gray-500 text-lg hover:text-black transition duration-200"
                    onClick={onClose}  // Close the notification panel
                >
                    <IoCloseCircle />
                </button>
            </div>

            {/* Notification List with Scrollbar */}
            <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2">
                {notifications.length > 0 ? (
                    <ul className="space-y-2">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className="flex justify-between items-center text-sm text-gray-800 border-b pb-2 last:border-none hover:bg-gray-100 p-2 rounded-md transition duration-200"
                            >
                                <div>
                                    <p>{notification.message}</p>
                                    <span className="block text-xs text-gray-500">{notification.time}</span>
                                </div>
                                <button
                                    onClick={() => onDelete(notification.id)}
                                    className="text-red-500 text-lg hover:text-red-700 transition duration-200"
                                >
                                    <IoClose /> {/* Individual notification close button */}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-sm text-center">No new notifications!</p>
                )}
            </div>
        </motion.div>
    );
};

export default NotificationList;
