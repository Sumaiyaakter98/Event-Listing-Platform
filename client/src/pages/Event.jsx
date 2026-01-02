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

  const fetchEvents = async () => {
    try {
      let url = "/events";
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (location) params.append("location", location);
      
      const res = await api.get(`${url}?${params.toString()}`);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">Upcoming Events</h1>
      
      {/* ফিল্টার সেকশন */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center bg-base-200 p-6 rounded-2xl">
        <div className="form-control w-full max-w-xs">
          <label className="label-text font-bold mb-1">Category</label>
          <select className="select select-bordered" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label-text font-bold mb-1">Location</label>
          <input type="text" placeholder="Search City..." className="input input-bordered" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>

      {/* ইভেন্ট গ্রিড */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => <EventCard key={event._id} event={event} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100 rounded-box border-2 border-dashed">
          <p className="text-gray-500 italic text-xl">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Events;