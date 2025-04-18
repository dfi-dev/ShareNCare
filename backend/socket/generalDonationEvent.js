const emitEvent = require("./emitEvent");

module.exports = (socket, io) => {

  // New Donation Event
  socket.on("newDonation", (data) => {
    console.log("New donation received:", data);

    emitEvent(io, "admin", "updateDonations", data);        // Emit to admins
    emitEvent(io, "recipient", "updateDonations", data);    // Emit to recipients
  });

  // Donation Deleted Event
  socket.on("donationDeleted", (data) => {
    console.log("Donation deleted:", data);

    emitEvent(io, "admin", "donationDeleted", data);        // Emit to admins
    emitEvent(io, "recipient", "donationDeleted", data);    // Emit to recipients
  });

  // Donation Status Updated Event
  socket.on("donationStatusUpdated", (data) => {
    console.log("Donation status updated:", data);

    emitEvent(io, "admin", "donationStatusUpdated", data);   // Emit to admins
    emitEvent(io, "recipient", "donationStatusUpdated", data);// Emit to recipients
  });

  // New Blood Donation Event
  socket.on("newBloodDonation", (data) => {
    console.log("New blood donation received:", data);

    emitEvent(io, "admin", "updateBloodDonations", data);    // Emit to admins
    emitEvent(io, "recipient", "updateBloodDonations", data);// Emit to recipients
  });

  // Blood Donation Status Updated Event
  socket.on("bloodDonationStatusUpdated", (data) => {
    console.log("Blood donation status updated:", data);

    emitEvent(io, "admin", "bloodDonationStatusUpdated", data);   // Emit to admins
    emitEvent(io, "recipient", "bloodDonationStatusUpdated", data);// Emit to recipients
  });

  // Blood Donation Deleted Event
  socket.on("bloodDonationDeleted", (data) => {
    console.log("Blood donation deleted:", data);

    emitEvent(io, "admin", "bloodDonationDeleted", data);         // Emit to admins
    emitEvent(io, "recipient", "bloodDonationDeleted", data);     // Emit to recipients
  });

};
