import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  conversationId: { type: String, required: true, unique: true },
  messages: [
    {
      senderId: String,
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Conversation", conversationSchema);
