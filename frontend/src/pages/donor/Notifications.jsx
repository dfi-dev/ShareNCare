import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck, FiX, FiClock, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { PiBellSimpleFill } from 'react-icons/pi';

const NotificationsPage = () => {

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

  const tabs = ["all", "unread", "read"];

  const [activeFilter, setActiveFilter] = useState("all");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

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
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 10 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div className="flex items-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }}
            >
              <PiBellSimpleFill className="text-2xl sm:text-3xl text-indigo-600 mr-3" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-indigo-600 bg-clip-text text-transparent">
              Notifications
            </h1>

            {notifications.some(n => !n.read) && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="ml-2 px-2 py-[1px] bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] font-semibold rounded-full shadow-lg"
              >
                {notifications.filter(n => !n.read).length} new
              </motion.span>
            )}
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(99, 102, 241, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllAsRead}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:shadow-indigo-300/50 transition-all duration-300 text-sm font-semibold w-full sm:w-auto relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: notifications.some(n => !n.read) ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <FiCheck className="text-lg" />
              </motion.span>
              Mark all as read
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
            />
            <motion.span
              className="absolute top-0 left-0 w-full h-0.5 bg-white/30"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5
              }}
            />
          </motion.button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-[8px] shadow-lg border border-gray-100 mb-6 overflow-hidden"
        >
          <div className="flex justify-center items-center p-2 gap-1 relative">
            {tabs.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative w-[100px] py-2 text-sm font-medium rounded-lg z-10 transition-colors duration-200 ${isActive
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-indigo-600 rounded-lg shadow-md z-[-1]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              );
            })}
          </div>
        </motion.div>


        {/* Notifications List */}
        <motion.div
          className="space-y-3 overflow-y-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  variants={itemVariants}
                  exit="exit"
                  className={`relative rounded-lg border border-gray-200 p-3 sm:p-4 transition-all ${notification.read ? "bg-white" : "bg-indigo-50 border-l-4 border-indigo-500"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${notification.read ? "bg-gray-100 text-gray-500" : "bg-white text-indigo-600 shadow-sm"}`}>
                      {getTypeIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className={`text-sm sm:text-base font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-3">
                    {!notification.read && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
                      >
                        <FiCheck size={14} />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <FiX size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="mx-auto w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <FiBell className="text-gray-400 text-xl" />
                </div>
                <h3 className="text-gray-500 font-medium">No notifications</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {activeFilter === "unread" ? "You're all caught up!" : "No notifications to display"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default NotificationsPage;