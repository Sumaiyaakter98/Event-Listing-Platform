import User from "../models/User.js";
import Event from "../models/Event.js";

// SAVE EVENT FOR USER
export const saveEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Avoid duplicate save
    if (!user.savedEvents.includes(req.params.eventId)) {
      user.savedEvents.push(req.params.eventId);
      await user.save();
    }

    res.json({ message: "Event saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SAVED EVENTS OF USER
export const getSavedEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedEvents");
    res.json(user.savedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
