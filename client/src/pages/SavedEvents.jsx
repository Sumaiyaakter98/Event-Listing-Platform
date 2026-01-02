
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const SavedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await api.get("/users/saved");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching saved events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, []);
const handleRemove = async (eventId) => {
  if (window.confirm("Are you sure you want to remove this?")) {
    try {
      // DELETE এর বদলে POST ট্রাই করুন যদি আপনার ব্যাকএন্ড সেভাবে তৈরি থাকে
      await api.post(`/users/save/${eventId}`); 
      
      setEvents(events.filter((event) => event._id !== eventId));
      alert("Removed successfully!");
    } catch (error) {
      console.error("Error removing event:", error);
      alert("Failed to remove: " + (error.response?.data?.error || "Unknown error"));
    }
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-10 min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
          Saved Events
        </h2>
        <div className="badge badge-secondary font-bold">{events.length}</div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
          <div className="text-5xl mb-4">🔖</div>
          <p className="text-xl text-gray-500 italic">You haven't saved any events yet.</p>
          <Link to="/events" className="btn btn-primary mt-6">Browse Events</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event._id} 
              className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* ইভেন্ট ইমেজ সেকশন */}
              <figure className="relative h-48 overflow-hidden">
                <img 
                  src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop"} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <div className="badge badge-primary font-bold shadow-md">{event.category}</div>
                </div>
              </figure>

              <div className="card-body p-5">
                <h3 className="card-title text-xl font-bold text-base-content">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mt-2">
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span> {event.location}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <span>📅</span> {new Date(event.date).toLocaleDateString()} at {event.time || "N/A"}
                  </p>
                </div>

                <div className="card-actions justify-between items-center mt-6 pt-4 border-t">
                  <Link 
                    to={`/events/${event._id}`} 
                    className="btn btn-sm btn-outline btn-primary px-6"
                  >
                    View Details
                  </Link>
                 <button 
                    onClick={() => handleRemove(event._id)} // এখানে ফাংশনটি কল করা হয়েছে
                    className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                    title="Remove from saved"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedEvents;