import Event from "../models/Event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS
// GET /api/events?category=Tech&location=Dhaka
export const getEvents = async (req, res) => {
  try {
    const { category, location } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = location;
    }

    const events = await Event.find(filter);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// GET SINGLE EVENT BY ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// Update Event
export const updateEvent = async (req, res) => {
  const { id } = req.params; // ইউআরএল থেকে আইডি নেওয়া
  try {
    // ডাটাবেসে ইভেন্টটি খুঁজে আপডেট করা
    const updatedEvent = await Event.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true } // নতুন ডাটা রিটার্ন করবে এবং ভ্যালিডেশন চেক করবে
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY EVENTS (logged-in user)
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
