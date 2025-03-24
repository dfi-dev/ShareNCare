import { useState } from "react";
import { HiMiniBellAlert } from "react-icons/hi2";
import { BellIcon } from '@heroicons/react/24/outline';
import { AnimatePresence } from "framer-motion";
import NotificationList from "./NotificationList";

// Function to generate random notifications
const generateRandomNotification = () => {
    const messages = [
        "🎁 New donation request received!",
        "✅ Your donation was approved!",
        "🚀 You have unlocked a new donor badge!",
        "🔥 Someone liked your donation!",
        "📢 A new campaign has started!",
        "🎉 You reached a new donor milestone!",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return {
        id: Date.now(),
        message: messages[randomIndex],
        time: new Date().toLocaleTimeString(),
    };
};

const Notifications = () => {
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // Add a new random notification
    const addRandomNotification = () => {
        setNotifications((prev) => [generateRandomNotification(), ...prev]);
    };

    // Delete a specific notification
    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter(notification => notification.id !== id));
    };

    return (
        <div className="relative">
            {/* Notification AnimatedButton */}
            <button
                onClick={() => {
                    setNotificationOpen(!notificationOpen);
                    addRandomNotification(); // Add a new random notification
                }}
                className="relative p-2 rounded-full text-gray-700 hover:text-black focus:ring-2 focus:ring-gray-700"
            >
                <span className="sr-only">View notifications</span>

                {notifications.length > 0 ? (
                    <div className="relative">
                        <HiMiniBellAlert className="size-6" />
                        <span className="absolute top-[-5px] right-[7px] bg-[rgb(249,30,30)] text-white text-[8px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full">
                            {notifications.length}
                        </span>
                    </div>
                ) : (
                    <BellIcon className="size-6" />
                )}
            </button>

            {/* Animate Notification List with AnimatePresence */}
            <AnimatePresence>
                {notificationOpen && (
                    <NotificationList
                        notifications={notifications}
                        onClose={() => setNotificationOpen(false)}
                        onDelete={deleteNotification}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
