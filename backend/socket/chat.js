const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const User = require("../models/User");

// A simple in-memory map: userId -> socketId
// (For production use a more robust store like Redis)
const activeUsers = new Map();

const initChatSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL || "*", methods: ["GET", "POST"] }
  });

  console.log("Socket.IO initialized");

  io.use((socket, next) => {
    // Expect token in query: ?token=...
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(new Error("Authentication error: token missing"));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = { id: payload.id, role: payload.role };
      next();
    } catch (err) {
      next(new Error("Authentication error: invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user.id;
    console.log(`Socket connected: ${socket.id} (user ${userId})`);
    activeUsers.set(userId, socket.id);

    // Notify admin(s) or user(s) that user came online (optional)
    socket.broadcast.emit("user_connected", { userId });

    // Join a room based on conversationId if provided by client
    socket.on("join", (conversationId) => {
      if (conversationId) socket.join(conversationId);
    });

    // Handle sending message (real-time)
    // payload: { conversationId, receiverId, text }
    socket.on("send_message", async (payload) => {
      const { conversationId, receiverId, text } = payload;
      if (!conversationId || !receiverId || !text) return;

      try {
        const saved = await Message.create({
          conversationId,
          sender: userId,
          receiver: receiverId,
          text
        });

        // Emit to room (both participants if joined) and directly to receiver socket
        io.to(conversationId).emit("receive_message", saved);

        const receiverSocketId = activeUsers.get(String(receiverId));
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", saved);
        }
      } catch (err) {
        console.error("Socket message save error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      activeUsers.delete(userId);
      socket.broadcast.emit("user_disconnected", { userId });
    });
  });
};

module.exports = { initChatSocket };
