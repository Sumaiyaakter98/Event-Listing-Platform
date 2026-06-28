import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
  getMyEvents,
  updateEvent,
} from "../controllers/eventController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// create event (login required)
router.post("/", auth, createEvent);

// get all events + FILTER (category, location)
router.get("/", getEvents);

// my events (login required)  ⚠️ must be BEFORE :id
router.get("/my-events", auth, getMyEvents);

// single event details
router.get("/:id", getEventById);

// update event
router.put("/:id", auth, updateEvent);

// delete event
router.delete("/:id", auth, deleteEvent);

export default router;
