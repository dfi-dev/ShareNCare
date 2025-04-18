require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
require("./config/passport");

connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const socketManager = require("./socket/socketManager");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully 🚀");
});


const authRoutes = require("./routes/authRoutes");
const generalDonationRoutes = require("./routes/generalDonationRoutes");
const bloodDonationRoutes = require("./routes/bloodDonationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const otpRoutes = require('./routes/otpRoutes');
const statsRoutes = require('./routes/statsRoutes');  

app.use("/api/auth", authRoutes);
app.use("/api/general-donations", generalDonationRoutes);
app.use("/api/blood-donations", bloodDonationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/stats', statsRoutes);  

// Initialize Socket.IO Events
socketManager(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Gracefully close the server on Nodemon restart
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed successfully.');
    process.exit(0); // Exit the process cleanly
  });
});