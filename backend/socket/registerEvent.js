const socketUserMap = require("../utils/socketUserMap");

module.exports = (socket, io) => {
  socket.on("register", ({ userId, role }) => {
    if (userId && role) {
      socketUserMap.users[userId] = socket.id;

      if (["admin", "donor", "recipient"].includes(role)) {
        socket.join(role); 
        socketUserMap.roles[role].add(userId);
      }

      console.log(`Mapped User ${userId} to Socket ${socket.id} and joined room ${role}`);
    } else {
      console.error("Registration failed: Invalid userId or role");
    }
  });
};
