// backend/routes/chat.js
import express from "express";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("Chat route is working!");
});

export default router;
