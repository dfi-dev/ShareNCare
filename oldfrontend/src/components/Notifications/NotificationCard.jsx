import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineTrash, HiOutlineCheck, HiOutlineSparkles } from "react-icons/hi";

const NotificationCard = ({ notification, onDelete, onMarkAsRead }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    onMarkAsRead(notification.id);
  };

  return (
    <motion.li
      key={notification.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-4 group bg-white border border-gray-200/60 rounded-2xl transition-all duration-200 ease-out hover:border-gray-300/80 hover:shadow-lg"
      whileHover={{ 
        y: -2,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      {/* Glowing accent border */}
      <motion.div 
        className="absolute left-0 inset-y-0 w-1 overflow-hidden rounded-l-2xl"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-full bg-gradient-to-b from-blue-400 to-purple-500 relative">
          <motion.div 
            className="absolute inset-0 bg-white/20"
            animate={{
              opacity: [0, 0.3, 0],
              y: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Floating action buttons */}
      <div className="absolute right-3 top-3 flex flex-col items-end space-y-1 z-10">
        <motion.button
          onClick={handleDelete}
          className="flex items-center justify-center p-1.5 rounded-full bg-white text-gray-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all"
          aria-label="Delete notification"
          initial={{ opacity: 0, scale: 0.9, x: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.9,
            x: isHovered ? 0 : 10
          }}
          transition={{ type: "spring", stiffness: 500 }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.4 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlineTrash className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="relative flex items-center gap-3 pl-3 pr-1 min-h-[64px]">
        <div className="flex-1 min-w-0 space-y-1.5 cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <motion.h4 
                className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug"
                whileHover={{ x: 2 }}
              >
                {notification.title || "Notification"}
              </motion.h4>
              
              {!notification.isRead && (
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    className="text-[9px] font-bold tracking-wider text-white px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{
                      background: 'linear-gradient(135deg, #f43f5e, #d946ef)',
                      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
                    }}
                    animate={{
                      scale: isHovered ? 0.95 : 1,
                      opacity: isHovered ? 0.9 : 1,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <HiOutlineSparkles className="w-2.5 h-2.5" />
                    NEW
                  </motion.span>
                </motion.div>
              )}
            </div>
          </div>

          <motion.p 
            className={`text-sm text-gray-700 ${isExpanded ? '' : 'line-clamp-2'}`}
            whileHover={{ x: 1 }}
          >
            {notification.message}
          </motion.p>

          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{notification.time}</span>
              {notification.priority === 'high' && (
                <motion.span 
                  className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Urgent
                </motion.span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {notification.action && (
                <motion.button
                  className="text-xs px-2.5 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    notification.action?.onClick();
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {notification.action.label}
                </motion.button>
              )}

              {!notification.isRead && (
                <motion.button
                  className="flex items-center space-x-1 text-[10px] px-2 py-[3px] rounded-full text-white transition-all duration-200 shadow-sm"
                  style={{
                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)',
                    backgroundSize: '200% 200%'
                  }}
                  onClick={handleMarkAsRead}
                  whileHover={{
                    scale: 1.05,
                    backgroundPosition: '100% 100%',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{
                    scale: 0.98,
                    backgroundPosition: '80% 80%'
                  }}
                  transition={{
                    backgroundPosition: { duration: 0.5, ease: 'easeInOut' },
                    scale: { type: 'spring', stiffness: 400, damping: 15 }
                  }}
                >
                  <HiOutlineCheck className="w-3 h-3 opacity-90 group-hover:opacity-100" />
                  <span className="font-medium">Mark Read</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle hover overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-xl"
        initial={{ opacity: 0 }}
      />
    </motion.li>
  );
};

export default NotificationCard;