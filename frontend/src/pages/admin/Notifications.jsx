import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck, FiX, FiClock, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Donation Received",
      message: "Your donation of $50 has been successfully processed.",
      time: "2 minutes ago",
      read: false,
      type: "success"
    },
    {
      id: 2,
      title: "Upcoming Event",
      message: "Community food drive this Saturday at 10 AM.",
      time: "1 hour ago",
      read: true,
      type: "info"
    },
    {
      id: 3,
      title: "Account Update Required",
      message: "Please update your payment information for recurring donations.",
      time: "5 hours ago",
      read: false,
      type: "warning"
    },
    {
      id: 4,
      title: "Thank You!",
      message: "Your recent contribution helped feed 10 families this week.",
      time: "1 day ago",
      read: true,
      type: "success"
    },
    {
      id: 5,
      title: "Service Interruption",
      message: "Scheduled maintenance this Friday from 2-4 AM.",
      time: "2 days ago",
      read: true,
      type: "alert"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "read") return notification.read;
    return true;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "success": return <FiCheck className="text-green-500" />;
      case "warning": return <FiAlertCircle className="text-yellow-500" />;
      case "alert": return <FiAlertCircle className="text-red-500" />;
      default: return <FiInfo className="text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8"
        >
          <div className="flex items-center flex-wrap gap-3">
            <FiBell className="text-3xl text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            {notifications.some(n => !n.read) && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                {notifications.filter(n => !n.read).length} New
              </span>
            )}
          </div>
          <button
            onClick={markAllAsRead}
            className="w-full sm:w-auto px-4 py-2 bg-white text-indigo-600 rounded-lg shadow hover:bg-indigo-50 transition-colors text-sm font-medium"
          >
            Mark all as read
          </button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {["all", "unread", "read"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Notification List */}
        <motion.div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start justify-between gap-4 p-5 rounded-xl shadow-sm border ${notification.read
                      ? "bg-white border-gray-200"
                      : "bg-indigo-50 border-indigo-200"
                    }`}
                >
                  {/* Icon and Info */}
                  <div className="flex gap-4 w-full">
                    <div className="pt-1 text-xl">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-base ${notification.read ? "text-gray-600" : "text-gray-800"
                        }`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-400 flex items-center mt-2">
                        <FiClock className="mr-1" />
                        {notification.time}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 items-end min-w-[40px]">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded-full transition-colors"
                        title="Mark as read"
                      >
                        <FiCheck size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <FiBell className="text-3xl text-indigo-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
                <p className="text-gray-500 mt-1">
                  {activeFilter === "unread"
                    ? "You're all caught up!"
                    : "You don't have any notifications yet"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;