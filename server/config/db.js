import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Sora-sori connect string bypass path (connditional structure bad)
    const dbURI = "mongodb+srv://sa9075971_db_user:root123@cluster0.v9uwzoo.mongodb.net/event_lisener_database?retryWrites=true&w=majority";

    await mongoose.connect(dbURI);
    console.log("MongoDB Connected Successfully to Atlas!");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    // Vercel serverless process exit bad diye handler return kora safe
    return false;
  }
};

export default connectDB;