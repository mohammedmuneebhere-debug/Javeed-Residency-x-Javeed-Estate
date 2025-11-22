const express = require("express");
const User = require("../models/User");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET /api/users/me
 * Protected: returns current user
 */
router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.currentUser);
});

/**
 * GET /api/users/      (admin only)
 * returns list of users
 */
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PATCH /api/users/:id/role  (admin only)
 * body: { role }
 */
router.patch("/:id/role", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
