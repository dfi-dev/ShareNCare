const socketUserMap = require("../utils/socketUserMap");

/**
 * Emit event to specific users, roles, all users, or a combination, with exclusion support.
 * @param {Object} io - Socket.IO instance
 * @param {Object | string | string[]} target - { users: [], roles: [] } OR single role OR multiple roles OR "all"
 * @param {string} event - Event name
 * @param {Object} data - Event data
 * @param {string} [excludeUser] - User ID to exclude from emission (optional)
 */
const emitEvent = (io, target, event, data, excludeUser = null) => {
  console.log(`🔹 Emitting event "${event}" to target(s): ${JSON.stringify(target)}`);

  const emittedSockets = new Set();

  if (target === "all") {
    Object.entries(socketUserMap.users)
      .filter(([userId]) => userId !== excludeUser)
      .forEach(([, socketId]) => {
        if (!emittedSockets.has(socketId)) {
          io.to(socketId).emit(event, data);
          emittedSockets.add(socketId);
          console.log(`✅ Emitted to socket ID: ${socketId}`);
        }
      });
    return;
  }

  // Handle target as an object with users and/or roles
  const targets = {
    users: [],
    roles: []
  };

  if (typeof target === "string") {
    targets.roles = [target];  // Single role
  } else if (Array.isArray(target)) {
    targets.roles = target;    // Multiple roles
  } else if (typeof target === "object") {
    // Extract users and roles from the object
    targets.users = target.users || [];
    targets.roles = target.roles || [];
  }

  // Emit to specific users
  targets.users.forEach((userId) => {
    if (socketUserMap.users[userId] && userId !== excludeUser) {
      const socketId = socketUserMap.users[userId];
      if (!emittedSockets.has(socketId)) {
        io.to(socketId).emit(event, data);
        emittedSockets.add(socketId);
        console.log(`✅ Emitted "${event}" to user: ${userId}`);
      }
    } else {
      console.warn(`⚠️ User ${userId} not connected`);
    }
  });

  // Emit to roles
  targets.roles.forEach((role) => {
    if (socketUserMap.roles[role]) {
      socketUserMap.roles[role].forEach((userId) => {
        if (userId !== excludeUser && socketUserMap.users[userId]) {
          const socketId = socketUserMap.users[userId];
          if (!emittedSockets.has(socketId)) {
            io.to(socketId).emit(event, data);
            emittedSockets.add(socketId);
            console.log(`✅ Emitted to role: ${role}, user: ${userId}`);
          }
        }
      });
    } else {
      console.warn(`⚠️ Role ${role} not found`);
    }
  });

  // If no valid targets were found
  if (emittedSockets.size === 0) {
    console.warn(`⚠️ No valid targets found for "${event}"`);
  }
};

module.exports = emitEvent;
