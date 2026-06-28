import mongoose from "mongoose";

const dbURI = "mongodb+srv://sa9075971_db_user:root123@cluster0.v9uwzoo.mongodb.net/event_lisener_database?retryWrites=true&w=majority";

const connectDB = async () => {
  // Jodi age thekei connect thake (1 = connected, 2 = connecting)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
  }
};

export default connectDB;