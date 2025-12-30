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

  // Fetch My Events
  useEffect(() => {
    api.get("/events/my-events").then((res) => setEvents(res.data));
  }, []);

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/events", { title,category, location, date, time, description });
      setEvents([...events, res.data]);
      setTitle("");setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription("");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to create event");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={createEvent}>
        <input placeholder="Event Title" value={title} onChange={e=>setName(e.target.value)} className="border w-full p-2 mb-2"/>
       <select 
          value={category} 
          onChange={e=>setCategory(e.target.value)} 
          className="border w-full p-2 mb-2"
          required
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
        </select>
        <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} className="border w-full p-2 mb-2"/>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border w-full p-2 mb-2"/>
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="border w-full p-2 mb-2"/>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="border w-full p-2 mb-2"/>
        <button type="submit" className="bg-blue-600 text-white w-full p-2">Create Event</button>
      </form>

      <h2 className="text-xl font-bold mt-6 mb-2">My Events</h2>
      <ul>
        {events.map(ev => (
          <li key={ev._id} className="border p-2 mb-2">
            {ev.name} - {ev.location} ({ev.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
