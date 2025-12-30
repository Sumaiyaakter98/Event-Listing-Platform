import { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState(""); // এখানে title ব্যবহার করা হয়েছে
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  // Fetch My Events
  useEffect(() => {
    api.get("/events/my-events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      
      const res = await api.post("/events", { 
        title, 
        category, 
        location, 
        date, 
        time, 
        description 
      });
      
      setEvents([...events, res.data]);
      
      setTitle(""); setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription("");
      alert("Event created successfully!");
    } catch (err) {
      console.log("Error details:", err.response?.data);
      alert(err.response?.data?.message || "Failed to create event");
    }
  };
  // Dashboard.jsx এ ডিলিট ফাংশন
const deleteEvent = async (id) => {
  if (window.confirm("Are you sure?")) {
    await api.delete(`/events/${id}`);
    setEvents(events.filter(ev => ev._id !== id));
    alert("Deleted!");
  }
}

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={createEvent}>
        <input 
          placeholder="Event Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} // নিশ্চিত করুন এখানে setTitle আছে
          className="border w-full p-2 mb-2"
          required
        />
        
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="border w-full p-2 mb-2"
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
          onChange={(e) => setLocation(e.target.value)} 
          className="border w-full p-2 mb-2"
          required
        />
        
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="border w-full p-2 mb-2"
          required
        />

        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          className="border w-full p-2 mb-2"
        />

        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border w-full p-2 mb-2"
        />

        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Create Event
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6 mb-2">My Events</h2>
      <ul>
        {events.length > 0 ? (
          events.map((ev) => (
            <li key={ev._id} className="border p-2 mb-2 rounded flex justify-between items-center shadow-sm">
              <div>
                <strong>{ev.title}</strong> - {ev.location} <br/>
                <small>{ev.date}</small>
              </div>
              <button 
                onClick={() => deleteEvent(ev._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;