import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [category, location]);

const fetchEvents = async (cat, loc) => {
  let url = "/events";
  if (cat) url += `?category=${cat}`;
  if (loc) url += `${cat ? "&" : "?"}location=${loc}`;

  const res = await api.get(url);
  setEvents(res.data);
};

  return (
    <div className="container mx-auto p-4">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
        </select>

        <input
          type="text"
          placeholder="Location (e.g. Dhaka)"
          className="border p-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Events */}
      <div className="grid md:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
