import { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  // 1. Fetching all my events
  useEffect(() => {
    api.get("/events/my-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  // 2. Function to delete event
  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        // UI theke muche fela
        setEvents(events.filter(ev => ev._id !== id));
        alert("Event Deleted!");
      } catch (err) {
        alert("Failed to delete event");
      }
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/events", { 
        title, category, location, date, time, description 
      });
      setEvents([...events, res.data]);
      setTitle(""); setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription("");
      alert("Event created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Create New Event</h2>
      
      {/* Event Form */}
      <form onSubmit={createEvent} className="mb-10 space-y-3 border-b pb-6">
        <input placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} className="border w-full p-2 rounded" required />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border w-full p-2 rounded" required>
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
        </select>
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border w-full p-2 rounded" required />
        <div className="flex gap-2">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border w-1/2 p-2 rounded" required />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="border w-1/2 p-2 rounded" />
        </div>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border w-full p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded font-bold hover:bg-blue-700">Create Event</button>
      </form>

      {/* Events List Section */}
      <h2 className="text-xl font-bold mt-6 mb-4">My Events List</h2>
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((ev) => (
            <div key={ev._id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50 border-gray-200">
              <div>
                <h3 className="font-bold text-gray-800">{ev.title}</h3>
                <p className="text-sm text-gray-500">{ev.location} | {ev.date}</p>
              </div>
              
              {/* DELETE BUTTON - EKHANE THAKBE */}
              <button 
                onClick={() => deleteEvent(ev._id)} 
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition duration-200"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No events found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;