import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // ১. useEffect এ সরাসরি ফিল্টার চেঞ্জ হলে ডাটা ফেচ হবে
  useEffect(() => {
    fetchEvents();
  }, [category, location]);

  // ২. fetchEvents ফাংশনটি স্টেট থেকে সরাসরি ভ্যালু নিবে
  const fetchEvents = async () => {
    try {
      let url = "/events";
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (location) params.append("location", location);

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const res = await api.get(url);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Upcoming Events</h1>
      
      {/* Filters: Category and Location */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Filter by Category:</label>
          <select
            className="border p-2 rounded bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Filter by Location:</label>
          <input
            type="text"
            placeholder="Search by city (e.g. Dhaka)"
            className="border p-2 rounded bg-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Events Listing Section */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 italic">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Events;