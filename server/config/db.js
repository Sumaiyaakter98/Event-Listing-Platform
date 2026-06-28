import mongoose from "mongoose";

const dbURI =
  process.env.MONGO_URI ||
  "mongodb+srv://sa9075971_db_user:dhakabd123@cluster0.mongodb.net/event_lisener_database?retryWrites=true&w=majority";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  if (!dbURI) {
    throw new Error(
      "Missing MongoDB URI. Set MONGO_URI in environment variables.",
    );
  }

  try {
    const db = await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 15000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Handshake Success!");
  } catch (error) {
    console.error("Database Connection Error:", error);
    throw error;
  }
};

export default connectDB;
