const registerEvent = require("./registerEvent");
const donationEvent = require("./donationEvent");
const bloodDonationEvent = require("./bloodDonationEvent");   
const disconnectEvent = require("./disconnectEvent");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    registerEvent(socket, io);
    donationEvent(socket, io);
    bloodDonationEvent(socket, io);                      
    disconnectEvent(socket);
  });
};
