import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: process.env.DB_NAME,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected:", cached.conn.connection.name);
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
