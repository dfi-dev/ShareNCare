import React, {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";
import {TbArrowsDiagonalMinimize2} from "react-icons/tb";
import {MdCleaningServices} from "react-icons/md";
import {GoAlertFill} from "react-icons/go"; // Individual notification delete icon

const NotificationList = ({notifications, onClose, onDelete}) => {
    const listRef = useRef(null);
    const [hasScrollbar, setHasScrollbar] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); // lg breakpoint
    let notificationLen = notifications.length;

    useEffect(() => {
        const checkScrollbar = () => {
            if (listRef.current) {
                const isOverflowing = listRef.current.scrollHeight > listRef.current.clientHeight;
                setHasScrollbar(isOverflowing);
                setIsLargeScreen(window.innerWidth >= 1024); // Update screen size state
            }
        };

        checkScrollbar();
        window.addEventListener("resize", checkScrollbar);

        return () => window.removeEventListener("resize", checkScrollbar);
    }, [notifications]); // Runs when notifications change

    return (
        <motion.div
            initial={{x: "100%", opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: "100%", opacity: 0}}
            transition={{duration: 0.4, ease: "easeInOut"}}
            className="fixed top-0 right-0 w-full h-full lg:w-96 lg:max-h-[90vh] lg:h-auto lg:top-14 bg-white bg-opacity-60 backdrop-blur-md shadow-lg rounded-none lg:rounded-lg p-4 border border-gray-200 z-50 overflow-hidden"
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <GoAlertFill className="text-lg text-red-600"/>
                    {notificationLen > 0
                        ? `You have ${notificationLen} new ${notificationLen === 1 ? "alert" : "alerts"}`
                        : "You're all caught up!"}
                </h3>
                <button
                    className="text-gray-500 text-lg hover:text-black transition duration-200"
                    onClick={onClose} // Trigger close animation
                >
                    <TbArrowsDiagonalMinimize2/>
                </button>
            </div>

            {/* Notification List with Scrollbar */}
            <div
                ref={listRef}
                className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 transition-all ${isLargeScreen && hasScrollbar ? "pr-2" : ""}`}
                style={{
                    maxHeight: notifications.length > 5 ? "calc(100vh - 50px)" : "auto",
                    paddingBottom: "1rem",
                }}
            >
                {notifications.length > 0 ? (
                    <ul className="space-y-2">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className={`flex justify-between items-center text-sm text-gray-800 border-b pb-2 last:border-none p-4 rounded-md transition duration-200 bg-[#f5a2c421] hover:bg-[#fbf4f74f] ${isLargeScreen && hasScrollbar ? "mr-2" : ""} `}
                            >
                                <div>
                                    <p>{notification.message}</p>
                                    <span className="block text-xs text-gray-500">{notification.time}</span>
                                </div>
                                <button
                                    onClick={() => onDelete(notification.id)}
                                    className="text-blue-500 text-lg hover:text-blue-700 transition duration-200"
                                >
                                    <MdCleaningServices/>
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
