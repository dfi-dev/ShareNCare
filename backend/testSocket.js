const io = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("✅ Connected to WebSocket server");

  socket.emit("newDonation", { message: "Test donation" });

  socket.on("updateDonations", (data) => {
    console.log("🔔 New Donation Update:", data);
  });
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from server");
});
