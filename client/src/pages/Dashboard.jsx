import { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  
  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  
  // Edit State
  const [editingId, setEditingId] = useState(null);

  // 1. Fetch User's Events
  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const res = await api.get("/events/my-events");
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 2. Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { title, category, location, date, time, description };

    try {
      if (editingId) {
        // UPDATE Logic
        const res = await api.put(`/events/${editingId}`, eventData);
        setEvents(events.map((ev) => (ev._id === editingId ? res.data : ev)));
        setEditingId(null);
        alert("Event Updated Successfully!");
      } else {
        // CREATE Logic
        const res = await api.post("/events", eventData);
        setEvents([...events, res.data]);
        alert("Event Created Successfully!");
      }
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  // 3. Delete Event
  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter((ev) => ev._id !== id));
        alert("Event Deleted!");
      } catch (err) {
        alert("Failed to delete event");
      }
    }
  };

  // 4. Start Editing (Fill form with existing data)
  const startEdit = (ev) => {
    setEditingId(ev._id);
    setTitle(ev.title);
    setCategory(ev.category);
    setLocation(ev.location);
    // Date format fix for input (YYYY-MM-DD)
    const formattedDate = ev.date ? ev.date.split("T")[0] : "";
    setDate(formattedDate);
    setTime(ev.time || "");
    setDescription(ev.description || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(""); setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        {editingId ? "📝 Update Your Event" : "🚀 Create New Event"}
      </h2>
      
      {/* Event Form */}
      <form onSubmit={handleSubmit} className="mb-12 space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="Event Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            required 
          />
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
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
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            required 
          />
          <div className="flex gap-2">
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-blue-500" 
              required 
            />
            <input 
              type="time" 
              value={time} 
              onChange={e => setTime(e.target.value)} 
              className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>
        <textarea 
          placeholder="Detailed Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          className="border w-full p-3 rounded-lg h-24 focus:ring-2 focus:ring-blue-500" 
        />
        
        <div className="flex gap-3">
          <button type="submit" className={`flex-1 text-white p-3 rounded-lg font-bold transition ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {editingId ? "Update Event Information" : "Create Event"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white p-3 rounded-lg font-bold hover:bg-gray-500">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* My Events List Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">📋 My Listed Events</h2>
      <div className="grid gap-4">
        {events.length > 0 ? (
          events.map((ev) => (
            <div key={ev._id} className="border p-5 rounded-xl flex flex-wrap justify-between items-center bg-white hover:shadow-md transition border-gray-200">
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-bold text-xl text-gray-800">{ev.title}</h3>
                <p className="text-blue-600 font-medium">{ev.category}</p>
                <p className="text-sm text-gray-500 mt-1"> {ev.location} |  {new Date(ev.date).toLocaleDateString()}</p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <button 
                  onClick={() => startEdit(ev)} 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteEvent(ev._id)} 
                  className="bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-lg italic">You haven't created any events yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;