import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // try removing the extra options at the end if it timeouts
    const dbURI = "mongodb+srv://sa9075971_db_user:root123@cluster0.v9uwzoo.mongodb.net/event_lisener_database?retryWrites=true&w=majority";

    // bufferCommands false korle timeout crash message shorashori dhura porbe
    await mongoose.connect(dbURI, {
      bufferCommands: false 
    });
    console.log("MongoDB Connected Successfully to Atlas!");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    return false;
  }
};

export default connectDB;