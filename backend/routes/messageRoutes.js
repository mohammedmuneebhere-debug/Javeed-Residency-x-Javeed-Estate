const express = require("express");
const Message = require("../models/Message");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * POST /api/messages/
 * body: { conversationId, receiver, text }
 * Protected
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { conversationId, receiver, text } = req.body;
    if (!conversationId || !receiver || !text) return res.status(400).json({ message: "Missing fields" });

    const msg = await Message.create({
      conversationId,
      sender: req.user.id,
      receiver,
      text
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/messages/:conversationId
 * Protected - returns messages in conversation
 */
router.get("/:conversationId", authMiddleware, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 }).populate("sender", "name role").populate("receiver", "name role");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
