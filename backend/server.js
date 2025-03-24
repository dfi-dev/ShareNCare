const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("newDonation", (data) => io.emit("updateDonations", data));
});

server.listen(5000, () => console.log("Server running on port 5000"));
