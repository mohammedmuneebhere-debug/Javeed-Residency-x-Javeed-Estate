// server/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

// Use globalThis to avoid TypeScript/Node differences
let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Recommended mongoose settings
    mongoose.set("strictQuery", false);

    const opts = {
      // Keeps mongoose from buffering commands when the driver is disconnected
      bufferCommands: true,
      // connection pool size
      maxPoolSize: 10,
      // useNewUrlParser and useUnifiedTopology are defaults in modern mongoose,
      // but it's ok to be explicit for older versions:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("Database connection failed:", error);
    throw error;
  }

  return cached.conn;
}








// const mongoose = require("mongoose");

// const connectDB = async () => {
//   const uri = process.env.MONGO_URI || "mongodb://localhost:27017/javeedestate";
//   await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
//   console.log("MongoDB connected");
// };

// module.exports = connectDB;
