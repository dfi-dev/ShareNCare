const emitEvent = require("./emitEvent");

module.exports = (socket, io) => {

  // New Blood Donation Event
  socket.on("updateBloodDonations", (data) => {
    console.log("New blood donation received:", data);

    emitEvent(io, "admin", "updateBloodDonations", data);      // Emit to admins
    emitEvent(io, "recipient", "updateBloodDonations", data);  // Emit to recipients
  });

  // Blood Donation Request Event
  socket.on("newBloodRequest", (data) => {
    console.log("New blood request received:", data);

    emitEvent(io, "admin", "newBloodRequest", data);           // Emit to admins
    emitEvent(io, "donor", "newBloodRequest", data);           // Emit to donors
  });

  // Blood Donation Updated Event
  socket.on("bloodDonationUpdated", (data) => {
    console.log("Blood donation updated:", data);

    emitEvent(io, "admin", "bloodDonationUpdated", data);      // Emit to admins
    emitEvent(io, "recipient", "bloodDonationUpdated", data);  // Emit to recipients
  });

  // Blood Donation Status Updated Event
  socket.on("bloodDonationStatusUpdated", (data) => {
    console.log("Blood donation status updated:", data);

    emitEvent(io, "admin", "bloodDonationStatusUpdated", data);    // Emit to admins
    emitEvent(io, "recipient", "bloodDonationStatusUpdated", data);// Emit to recipients
  });

  // Blood Donation Deleted Event
  socket.on("bloodDonationDeleted", (data) => {
    console.log("Blood donation deleted:", data);

    emitEvent(io, "admin", "bloodDonationDeleted", data);         // Emit to admins
    emitEvent(io, "recipient", "bloodDonationDeleted", data);     // Emit to recipients
  });

};
