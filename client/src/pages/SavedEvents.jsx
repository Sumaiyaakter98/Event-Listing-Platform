import React, { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard"


const SavedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await api.get("/users/saved");
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Events</h2>

      {events.length === 0 && (
        <p className="text-gray-500">No saved events found</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p> {event.location}</p>
            <p> {event.date}</p>
            <p>{event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedEvents;
