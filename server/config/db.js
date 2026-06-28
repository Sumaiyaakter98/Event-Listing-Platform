import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // যদি প্রজেক্টটি Vercel-এ লাইভ থাকে (production), তবে সে ড্যাশবোর্ডের MONGO_URI নিবে।
    // আর আপনার পিসিতে রান করলে কোনো ইন্টারনেট ছাড়াই লোকাল ডাটাবেজ নিবে।
    const dbURI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_URI 
      : 'mongodb://127.0.0.1:27017/event_lisener_database'; 

    await mongoose.connect(dbURI);
    
    if (process.env.NODE_ENV === 'production') {
      console.log("MongoDB Connected to Atlas Cloud!");
    } else {
      console.log("MongoDB Connected to Local Database (event_lisener_database)");
    }
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;