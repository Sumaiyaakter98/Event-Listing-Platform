import { Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const EventCard = ({ event }) => {
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  // ডাটাবেসে ইমেজ না থাকলে একটি র‍্যান্ডম ইমেজ দেখাবে
  const displayImage = event.image || `https://source.unsplash.com/featured/?${event.category},${event._id}`;

  const saveEvent = async () => {
    if (!token) return setMsg("Login required");
    try {
      await api.post(`/users/save/${event._id}`);
      setMsg("Event saved!");
    } catch (error) {
      setMsg(error.response?.data?.error || "Failed to save");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <figure className="relative h-52 overflow-hidden">
        <img 
          src={displayImage} 
          alt={event.title} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* তারিখ ব্যাজ - ইমেজের উপরে */}
        <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded shadow-md text-center">
           <span className="block text-[10px] font-bold text-primary uppercase">
             {new Date(event.date).toLocaleString('default', { month: 'short' })}
           </span>
           <span className="block text-xl font-bold leading-none text-neutral">
             {new Date(event.date).getDate()}
           </span>
        </div>
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold hover:text-primary cursor-pointer transition-colors">
          {event.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2 mb-2">
          {event.description}
        </p>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <span>📍 {event.location}</span>
        </div>

        <div className="card-actions justify-between items-center mt-4 border-t pt-4">
          <Link to={`/events/${event._id}`} className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">
            Read More
          </Link>
          <button onClick={saveEvent} className="btn btn-ghost btn-xs text-green-600">Save</button>
        </div>
        {msg && <p className="text-[10px] text-error mt-1">{msg}</p>}
      </div>
    </div>
  );
};

export default EventCard;