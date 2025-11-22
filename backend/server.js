import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

// Routes
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  socket.on("join", (conversationId) => {
    socket.join(conversationId);
    console.log(`Joined room: ${conversationId}`);
  });

  socket.on("send_message", ({ conversationId, senderId, text }) => {
    const message = { conversationId, senderId, text, createdAt: new Date() };
    io.to(conversationId).emit("receive_message", message);
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
