const socketUserMap = require("../utils/socketUserMap");

module.exports = (socket) => {
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    setTimeout(() => {
      const disconnectedUser = Object.keys(socketUserMap.users).find(
        (userId) => socketUserMap.users[userId] === socket.id
      );

      if (disconnectedUser) {
        delete socketUserMap.users[disconnectedUser];
        console.log(`Removed mapping for User ${disconnectedUser}`);
      }
      
      Object.keys(socketUserMap.roles).forEach((role) => {
        socketUserMap.roles[role].delete(disconnectedUser);
      });
      
    }, 3000);
  });
};
