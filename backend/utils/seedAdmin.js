require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const connectDB = require("../config/db");

(async () => {
  try {
    await connectDB();
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("✅ Admin already exists:", existingAdmin.email);
      return process.exit(0);
    }

    const password = "Admin@123"; // you can change this
    const hashed = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@javeedestate.com",
      password: hashed,
      role: "admin"
    });

    console.log("🎉 Admin seeded successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", password);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
})();
