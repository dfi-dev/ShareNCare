import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiOutlineBell } from "react-icons/hi";
import NotificationCard from "./NotificationCard";

const NotificationList = ({ notifications, onDelete, onClearAll, onClose, onMarkAsRead }) => {
  const listRef = useRef(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const checkScrollbar = () => {
      if (listRef.current) {
        setHasScrollbar(listRef.current.scrollHeight > listRef.current.clientHeight);
        setIsLargeScreen(window.innerWidth >= 1024);
      }
    };

    checkScrollbar();
    window.addEventListener("resize", checkScrollbar);
    return () => window.removeEventListener("resize", checkScrollbar);
  }, [notifications]);

  const handleClearAll = (e) => {
    e.stopPropagation();
    onClearAll();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 lg:inset-auto lg:top-16 lg:right-4 w-full lg:w-96 h-screen lg:h-[85vh] max-h-screen bg-white/95 backdrop-blur-lg shadow-xl lg:rounded-xl border border-gray-200 z-50 overflow-hidden flex flex-col"

      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium text-gray-900 text-sm md:text-base">
            {notifications.length > 0
              ? `${notifications.length} New Notification${notifications.length !== 1 ? "s" : ""}`
              : "No Notifications"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close notifications"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div
          ref={listRef}
          className={`flex-1 overflow-y-auto custom-scrollbar ${
            isLargeScreen && hasScrollbar ? "pr-2" : ""
          }`}
        >
          <AnimatePresence>
            {notifications.length > 0 ? (
              <ul className="space-y-2 p-3">
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onDelete={onDelete}
                    onMarkAsRead={onMarkAsRead}
                  />
                ))}
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full p-8 text-center"
              >
                <HiOutlineBell className="w-12 h-12 text-gray-300 mb-4" />
                <h4 className="text-gray-500 font-medium text-lg">All caught up!</h4>
                <p className="text-sm text-gray-400 mt-2">
                  You don't have any new notifications
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div 
            className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClearAll}
              className="w-full py-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationList;
