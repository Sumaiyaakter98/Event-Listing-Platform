import mongoose from "mongoose";

// Pure clean production database string without extra session configuration flags
const dbURI = "mongodb+srv://sa9075971_db_user:root123@cluster0.v9uwzoo.mongodb.net/event_lisener_database";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 15000, // Wait up to 15 seconds for cloud authentication handshake
    });
    
    isConnected = db.connections[0].readyState;
    console.log("MongoDB Handshake Success!");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    throw error;
  }
};

export default connectDB;