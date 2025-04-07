import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineTrash, HiOutlineCheck } from "react-icons/hi";

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
      className="relative p-4 group bg-white/5 border border-gray-300/60 rounded-2xl transition-all duration-200 ease-out hover:border-gray-400/70"
    >
      {/* Combined delete button and unread indicator container */}
      <div className="absolute right-3 top-3 flex flex-col items-end space-y-1 z-10">
        {/* Delete button */}
        <motion.button
          onClick={handleDelete}
          className="flex items-center justify-center p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          aria-label="Delete notification"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ type: "spring", stiffness: 500 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlineTrash className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="relative flex items-center gap-3 pl-3 pr-1 min-h-[64px]">
        {/* Content */}
        <div
          className="flex-1 min-w-0 space-y-1.5 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                {notification.title || "Notification"}
              </h4>
              {/* NEW badge positioned right after title */}
              {!notification.isRead && (
                <motion.span
                  className="text-[9px] font-bold tracking-wider text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm"
                  style={{
                    background: 'rgba(220, 38, 38, 0.7)',
                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  animate={{
                    scale: isHovered ? 0.8 : 1,
                    opacity: isHovered ? 0 : 1,
                    background: isHovered
                      ? 'rgba(227, 43, 43, 0.82)'
                      : 'rgba(224, 15, 15, 0.77)'
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.2, 0, 0, 1]
                  }}
                >
                  NEW
                </motion.span>
              )}
            </div>
          </div>

          <p className={`text-sm text-gray-700 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {notification.message}
          </p>

          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{notification.time}</span>
              {notification.priority === 'high' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-medium">
                  Urgent
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {notification.action && (
                <button
                  className="text-xs px-2.5 py-1 rounded-full border border-gray-400/50 text-gray-700 hover:bg-gray-50/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    notification.action?.onClick();
                  }}
                >
                  {notification.action.label}
                </button>
              )}

              {/* Enhanced Mark as Read button */}
              {!notification.isRead && (
                <motion.button
                  className="flex items-center space-x-0.5 text-[10px] px-2 py-[2px] rounded-full border border-gray-300/50 text-white transition-all duration-200 shadow-xs hover:shadow-sm"
                  style={{
                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)',
                    backgroundSize: '200% 200%'
                  }}
                  onClick={handleMarkAsRead}
                  whileHover={{
                    scale: 1.03,
                    backgroundPosition: '100% 100%',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
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
                  <HiOutlineCheck className="w-2.5 h-2.5 opacity-90 group-hover:opacity-100" />
                  <span className="font-medium tracking-tighter">Mark Read</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover background effect */}
      <div className="absolute inset-0 bg-gray-50/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-xl" />
    </motion.li>
  );
};

export default NotificationCard;