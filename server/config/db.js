import mongoose from "mongoose";

// Ager URI string-er poriborte eta die change krun
const dbURI = "mongodb+srv://sa9075971_db_user:root123@cluster0.v9uwzoo.mongodb.net/event_lisener_database?appName=Cluster0";

// Connection reference globally dhore rakhar jonno jeno serverless route pool destroy na hoi
let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 5000, // 5 second-e connect na hole jeno instant retry/fail hoi, buffering block chara
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState;
    console.log("=> MongoDB Connected Successfully to Atlas!");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    throw error; // Throw korle middleware error response instant return korte parbe
  }
};

export default connectDB;