import { io } from "socket.io-client";

let socket;

export const initSocket = (token) => {
  socket = io("http://localhost:5000", { auth: { token } });
  return socket;
};

export const joinConversation = (conversationId) => {
  socket.emit("join", conversationId);
};

export const sendMessage = ({ conversationId, receiverId, text }) => {
  socket.emit("send_message", { conversationId, receiverId, text });
};

export const onReceiveMessage = (callback) => {
  socket.on("receive_message", callback);
};
