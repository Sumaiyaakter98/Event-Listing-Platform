import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRouthes.js";



dotenv.config();

const app = express();

// CORS & Body Parser
app.use(cors({
  origin: ["https://event-listing-platform-8pim.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// 🔥 NEW: Vercel Serverless Database Connection Middleware
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// Export/Listen logic
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;