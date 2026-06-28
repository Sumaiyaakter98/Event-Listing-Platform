import express from "express";
import auth from "../middleware/authMiddleware.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import { getSavedEvents, saveEvent } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/save/:eventId", auth, saveEvent);
router.get("/saved", auth, getSavedEvents);

export default router;
