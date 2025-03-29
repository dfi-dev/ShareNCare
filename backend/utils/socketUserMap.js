const socketUserMap = {
  users: {},           // Maps userId -> socketId
  roles: {             // Maps role -> Set of userIds
    admin: new Set(),
    donor: new Set(),
    recipient: new Set(),
  }
};

module.exports = socketUserMap;
