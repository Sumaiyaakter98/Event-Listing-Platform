import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data.slice(0, 6)); // upcoming 6 events
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {/* 🔷 Banner Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover Local Events Near You
          </h1>
          <p className="mb-6">Find, save, and manage events easily</p>
          <Link
            to="/events"
            className="bg-white text-blue-600 px-6 py-2 rounded font-semibold"
          >
            Browse Events
          </Link>
        </div>
      </section>

      {/* 🔷 Categories Section */}
      <section className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Music", "Sports", "Tech", "Education"].map((cat) => (
            <div
              key={cat}
              className="border rounded p-4 text-center hover:bg-blue-50"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* 🔷 Upcoming Events */}
      <section className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link to="/events" className="text-blue-600">
            View All
          </Link>
        </div>

        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
