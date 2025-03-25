const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();


const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// ✅ Set global.io for real-time notifications
global.io = io;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Attach `io` to each request (alternative to global.io)
app.use((req, res, next) => {
  req.io = io;
  next();
});


const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const bloodDonationRoutes = require("./routes/bloodDonationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/blood-donation", bloodDonationRoutes);
app.use("/api/notifications", notificationRoutes);

// WebSocket for Real-Time Notifications
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("newDonation", (data) => {
    console.log("New donation received:", data);
    io.emit("updateDonations", data);
  });

  socket.on("donationStatusUpdate", (data) => {
    console.log(`Donation status update: ${data.status} for User ${data.userId}`);
    io.emit("notification", { message: `Donation ${data.status}`, userId: data.userId });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
