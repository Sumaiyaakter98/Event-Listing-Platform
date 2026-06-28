import express from "express";
import auth from "../middleware/authMiddleware.js";
import { saveEvent, getSavedEvents } from "../controllers/userController.js";

const router = express.Router();

// Save an event to user's saved list
router.post("/save/:eventId", auth, saveEvent);

// Get all saved events of the logged-in user
router.get("/saved", auth, getSavedEvents);

export default router;
