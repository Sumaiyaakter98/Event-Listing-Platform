import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRouthes.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. CORS Configuration (Routes and JSON middleware-er shobcheye upore thakte hobe)
app.use(cors({
  origin: ["https://event-listing-platform-8pim.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Simple fallback structure handle korar jonno (optional kintu clean)
// app.options("*", cors()); 

// 2. Body Parser Middleware
app.use(express.json());

// 3. Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// 4. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// For Local Testing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));