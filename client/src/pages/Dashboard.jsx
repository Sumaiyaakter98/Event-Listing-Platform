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

 
  useEffect(() => {
    api.get("/events/my-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

 
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

  
  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter(ev => ev._id !== id)); /
        alert("Deleted!");
      } catch (err) {
        alert("Failed to delete event");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Event</h2>
      
      
      <form onSubmit={createEvent} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
        <input 
          placeholder="Event Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="border w-full p-2 mb-3 rounded" 
          required 
        />
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          className="border w-full p-2 mb-3 rounded" 
          required
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
        </select>
        <input 
          placeholder="Location" 
          value={location} 
          onChange={e => setLocation(e.target.value)} 
          className="border w-full p-2 mb-3 rounded" 
          required 
        />
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
          className="border w-full p-2 mb-3 rounded" 
          required 
        />
        <input 
          type="time" 
          value={time} 
          onChange={e => setTime(e.target.value)} 
          className="border w-full p-2 mb-3 rounded" 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          className="border w-full p-2 mb-3 rounded" 
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white w-full p-2 rounded transition font-semibold">
          Create Event
        </button>
      </form>

      
      <h2 className="text-xl font-bold mt-8 mb-4">My Events</h2>
      <ul className="space-y-3">
        {events.length > 0 ? (
          events.map((ev) => (
            <li key={ev._id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50 shadow-sm">
              <div className="flex-1">
                <strong className="text-lg text-blue-700">{ev.title}</strong>
                <p className="text-sm text-gray-600">{ev.location} | {new Date(ev.date).toLocaleDateString()}</p>
              </div>
              
             
              <button 
                onClick={() => deleteEvent(ev._id)} 
                className="ml-4 bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition font-medium"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic">No events found. Create your first event above!</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;