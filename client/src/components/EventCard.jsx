import { Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const EventCard = ({ event }) => {
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const saveEvent = async () => {
    if (!token) return setMsg("Login required");

    try {
      await api.post(`/users/save/${event._id}`);
      setMsg("Event saved!");
    } catch (error) {
      console.log(error.response?.data || error.message);
      setMsg(error.response?.data?.error || "Failed to save");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-xl font-semibold">{event.name}</h3>
      <p>{event.location}</p>
      <p>{event.date}</p>

      <div className="flex justify-between mt-3">
        <Link to={`/events/${event._id}`} className="text-blue-600">
          Details
        </Link>
        <button
          onClick={saveEvent}
          className="text-sm text-green-600"
          disabled={!token}
        >
          Save
        </button>
      </div>

      {msg && <p className="text-sm text-red-600 mt-1">{msg}</p>}
    </div>
  );
};

export default EventCard;
