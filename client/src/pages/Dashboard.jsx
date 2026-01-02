// import { useState, useEffect } from "react";
// import api from "../services/api";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
  
//   // Form States
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [location, setLocation] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
  
//   // Edit State
//   const [editingId, setEditingId] = useState(null);

//   // 1. Fetch User's Events
//   useEffect(() => {
//     fetchMyEvents();
//   }, []);

//   const fetchMyEvents = async () => {
//     try {
//       const res = await api.get("/events/my-events");
//       setEvents(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   // 2. Handle Create or Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const eventData = { title, category, location, date, time, description,image };

//     try {
//       if (editingId) {
//         // UPDATE Logic
//         const res = await api.put(`/events/${editingId}`, eventData);
//         setEvents(events.map((ev) => (ev._id === editingId ? res.data : ev)));
//         setEditingId(null);
//         alert("Event Updated Successfully!");
//       } else {
//         // CREATE Logic
//         const res = await api.post("/events", eventData);
//         setEvents([...events, res.data]);
//         alert("Event Created Successfully!");
//       }
//       resetForm();
//     } catch (err) {
//       alert(err.response?.data?.message || "Operation failed");
//     }
//   };

//   // 3. Delete Event
//   const deleteEvent = async (id) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await api.delete(`/events/${id}`);
//         setEvents(events.filter((ev) => ev._id !== id));
//         alert("Event Deleted!");
//       } catch (err) {
//         alert("Failed to delete event");
//       }
//     }
//   };

//   // 4. Start Editing (Fill form with existing data)
//   const startEdit = (ev) => {
//     setEditingId(ev._id);
//     setTitle(ev.title);
//     setCategory(ev.category);
//     setLocation(ev.location);
//     setImage(ev.image || "");
//     // Date format fix for input (YYYY-MM-DD)
//     const formattedDate = ev.date ? ev.date.split("T")[0] : "";
//     setDate(formattedDate);
//     setTime(ev.time || "");
//     setDescription(ev.description || "");
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setTitle(""); setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription("");setImage("");
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-100">
//       <h2 className="text-3xl font-extrabold mb-6 text-violet-700 text-center">
//         {editingId ? "📝 Update Your Event" : "🚀 Create New Event"}
//       </h2>
      
//       {/* Event Form */}
//       <form onSubmit={handleSubmit} className="mb-12 space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input 
//             placeholder="Event Title" 
//             value={title} 
//             onChange={e => setTitle(e.target.value)} 
//             className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
//             required 
//           />
//           <select 
//             value={category} 
//             onChange={e => setCategory(e.target.value)} 
//             className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none " 
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Tech">Tech</option>
//             <option value="Music">Music</option>
//             <option value="Sports">Sports</option>
//             <option value="Education">Education</option>
//           </select>
//           <input 
//             placeholder="Location" 
//             value={location} 
//             onChange={e => setLocation(e.target.value)} 
//             className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
//             required 
//           />
//           <div className="flex gap-2">
//             <input 
//               type="date" 
//               value={date} 
//               onChange={e => setDate(e.target.value)} 
//               className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-blue-500" 
//               required 
//             />
//             <input 
//               type="time" 
//               value={time} 
//               onChange={e => setTime(e.target.value)} 
//               className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-blue-500" 
//             />
//           </div>
//         </div>

//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold mb-2">Event Image URL</span></label>
//           <input 
//             type="text" 
//             placeholder="https://example.com/photo.jpg" 
//             value={image} 
//             onChange={e => setImage(e.target.value)} 
//             className="input input-bordered w-full focus:ring-2 focus:ring-blue-500" 
//           />
//         </div>
//         <textarea 
//           placeholder="Detailed Description" 
//           value={description} 
//           onChange={e => setDescription(e.target.value)} 
//           className="border w-full p-3 rounded-lg h-24 focus:ring-2 focus:ring-blue-500" 
//         />
        
//         <div className="flex gap-3">
//           <button type="submit" className={`flex-1 text-white p-3 rounded-lg font-bold transition ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-violet-600 hover:bg-violet-800'}`}>
//             {editingId ? "Update Event Information" : "Create Event"}
//           </button>
//           {editingId && (
//             <button type="button" onClick={resetForm} className="bg-gray-400 text-white p-3 rounded-lg font-bold hover:bg-gray-500">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* My Events List Section */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">📋 My Listed Events</h2>
//       <div className="grid gap-4">
//         {events.length > 0 ? (
//           events.map((ev) => (
//             <div key={ev._id} className="border p-5 rounded-xl flex flex-wrap justify-between items-center bg-white hover:shadow-md transition border-gray-200">
//               <div className="flex-1 min-w-[200px]">
//                 <h3 className="font-bold text-xl text-gray-800">{ev.title}</h3>
//                 <p className="text-violet-700 font-bold ">{ev.category}</p>
//                 <p className="text-sm text-gray-500 mt-1"> {ev.location} |  {new Date(ev.date).toLocaleDateString()}</p>
//               </div>
              
//               <div className="flex gap-3 mt-4 md:mt-0">
//                 <button 
//                   onClick={() => startEdit(ev)} 
//                   className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg font-semibold transition"
//                 >
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => deleteEvent(ev._id)} 
//                   className="bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//             <p className="text-gray-400 text-lg italic">You haven't created any events yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// statt?==================================================
// import { useState, useEffect } from "react";
// import api from "../services/api";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
  
//   // Form States
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [location, setLocation] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
  
//   // Edit State
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchMyEvents();
//   }, []);

//   const fetchMyEvents = async () => {
//     try {
//       const res = await api.get("/events/my-events");
//       setEvents(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const eventData = { title, category, location, date, time, description, image };

//     try {
//       if (editingId) {
//         const res = await api.put(`/events/${editingId}`, eventData);
//         setEvents(events.map((ev) => (ev._id === editingId ? res.data : ev)));
//         setEditingId(null);
//         alert("Event Updated Successfully!");
//       } else {
//         const res = await api.post("/events", eventData);
//         setEvents([...events, res.data]);
//         alert("Event Created Successfully!");
//       }
//       resetForm();
//     } catch (err) {
//       alert(err.response?.data?.message || "Operation failed");
//     }
//   };

//   const deleteEvent = async (id) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await api.delete(`/events/${id}`);
//         setEvents(events.filter((ev) => ev._id !== id));
//         alert("Event Deleted!");
//       } catch (err) {
//         alert("Failed to delete event");
//       }
//     }
//   };

//   const startEdit = (ev) => {
//     setEditingId(ev._id);
//     setTitle(ev.title);
//     setCategory(ev.category);
//     setLocation(ev.location);
//     setImage(ev.image || "");
//     const formattedDate = ev.date ? ev.date.split("T")[0] : "";
//     setDate(formattedDate);
//     setTime(ev.time || "");
//     setDescription(ev.description || "");
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setTitle(""); setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription(""); setImage("");
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-4 md:p-6 mb-20">
//       <h2 className="text-3xl font-extrabold mb-8 text-violet-700 text-center uppercase tracking-wider">
//         User Dashboard
//       </h2>

//       {/* ১. ইভেন্ট তৈরি বা এডিট করার ফর্ম */}
//       {/* <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 mb-12">
//         <h3 className="text-xl font-bold mb-6 text-gray-700">
//             {editingId ? "📝 Edit Event Details" : "🚀 Create a New Event"}
//         </h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <input placeholder="Event Name" value={title} onChange={e => setTitle(e.target.value)} className="input input-bordered w-full" required />
//             <select value={category} onChange={e => setCategory(e.target.value)} className="select select-bordered w-full" required>
//               <option value="">Category</option>
//               <option value="Tech">Tech</option>
//               <option value="Music">Music</option>
//               <option value="Sports">Sports</option>
//               <option value="Education">Education</option>
//             </select>
//             <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="input input-bordered w-full" required />
//             <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input input-bordered w-full" required />
//             <input type="time" value={time} onChange={e => setTime(e.target.value)} className="input input-bordered w-full" />
//             <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="input input-bordered w-full" />
//           </div>
//           <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="textarea textarea-bordered w-full h-24" />
          
//           <div className="flex gap-3">
//             <button type="submit" className={`btn flex-1 ${editingId ? 'btn-success' : 'btn-primary'} text-white`}>
//               {editingId ? "Save Changes" : "Create Event"}
//             </button>
//             {editingId && <button type="button" onClick={resetForm} className="btn btn-ghost bg-gray-200">Cancel</button>}
//           </div>
//         </form>
//       </div> */}
//       {/* ১. ইভেন্ট তৈরি বা এডিট করার ফর্ম */}
// <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 mb-12">
//   <h3 className="text-xl font-bold mb-6 text-gray-700">
//       {editingId ? "📝 Edit Event Details" : "🚀 Create a New Event"}
//   </h3>
//   <form onSubmit={handleSubmit} className="space-y-4">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* প্রথম লাইন: Name এবং Category */}
//       <div className="form-control">
//         <label className="label"><span className="label-text font-bold">Event Name</span></label>
//         <input 
//           placeholder="Enter event name" 
//           value={title} 
//           onChange={e => setTitle(e.target.value)} 
//           className="input input-bordered w-full" 
//           required 
//         />
//       </div>
//       <div className="form-control">
//         <label className="label"><span className="label-text font-bold">Category</span></label>
//         <select 
//           value={category} 
//           onChange={e => setCategory(e.target.value)} 
//           className="select select-bordered w-full" 
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Tech">Tech</option>
//           <option value="Music">Music</option>
//           <option value="Sports">Sports</option>
//           <option value="Education">Education</option>
//         </select>
//       </div>

//       {/* দ্বিতীয় লাইন: Location এবং Date */}
//       <div className="form-control">
//         <label className="label"><span className="label-text font-bold">Location</span></label>
//         <input 
//           placeholder="e.g. Dhaka, Bangladesh" 
//           value={location} 
//           onChange={e => setLocation(e.target.value)} 
//           className="input input-bordered w-full" 
//           required 
//         />
//       </div>
//       <div className="form-control">
//         <label className="label"><span className="label-text font-bold">Event Date</span></label>
//         <input 
//           type="date" 
//           value={date} 
//           onChange={e => setDate(e.target.value)} 
//           className="input input-bordered w-full" 
//           required 
//         />
//       </div>

//       {/* তৃতীয় লাইন: Time এবং Image URL */}
//       <div className="form-control">
//         <label className="label"><span className="label-text font-bold">Event Time</span></label>
//         <input 
//           type="time" 
//           value={time} 
//           onChange={e => setTime(e.target.value)} 
//           className="input input-bordered w-full" 
//         />
//       </div>
//       <div className="form-control">
//         <label className="label"><span className="label-text font-bold">Image URL</span></label>
//         <input 
//           placeholder="https://example.com/photo.jpg" 
//           value={image} 
//           onChange={e => setImage(e.target.value)} 
//           className="input input-bordered w-full" 
//         />
//       </div>
//     </div>

//     {/* ডেসক্রিপশন (ফুল উইডথ) */}
//     <div className="form-control">
//       <label className="label"><span className="label-text font-bold">Description</span></label>
//       <textarea 
//         placeholder="Write details about your event..." 
//         value={description} 
//         onChange={e => setDescription(e.target.value)} 
//         className="textarea textarea-bordered w-full h-28" 
//       />
//     </div>
    
//     <div className="flex gap-3 pt-2">
//       <button type="submit" className={`btn flex-1 ${editingId ? 'btn-success text-white' : 'btn-primary text-white font-bold'}`}>
//         {editingId ? "Save Changes" : "Create Event"}
//       </button>
//       {editingId && <button type="button" onClick={resetForm} className="btn btn-ghost bg-gray-200">Cancel</button>}
//     </div>
//   </form>
// </div>

//       {/* ২. ইভেন্ট লিস্ট টেবিল (Event Name, Date, Status, Actions) */}
//       <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
//         <div className="p-6 bg-violet-50 border-b">
//             <h3 className="text-xl font-bold text-violet-800">📋 My Listed Events</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table table-zebra w-full">
//             {/* কলাম হেডলাইন */}
//             <thead className="bg-gray-100">
//               <tr className="text-gray-700 text-sm">
//                 <th>Event Name</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.length > 0 ? (
//                 events.map((ev) => (
//                   <tr key={ev._id} className="hover">
//                     <td>
//                       <div className="font-bold text-gray-800">{ev.title}</div>
//                       <div className="text-xs opacity-50">{ev.category}</div>
//                     </td>
//                     <td>
//                       <span className="badge badge-ghost font-medium">
//                         {new Date(ev.date).toLocaleDateString()}
//                       </span>
//                     </td>
//                     <td>
//                       {/* স্ট্যাটাস লজিক: আজকের তারিখের সাথে তুলনা */}
//                       {new Date(ev.date) < new Date() ? (
//                         <span className="badge badge-error text-white gap-1">Expired</span>
//                       ) : (
//                         <span className="badge badge-success text-white gap-1">Active</span>
//                       )}
//                     </td>
//                     <td className="flex justify-center gap-2">
//                       <button onClick={() => startEdit(ev)} className="btn btn-sm btn-outline btn-warning">Edit</button>
//                       <button onClick={() => deleteEvent(ev._id)} className="btn btn-sm btn-outline btn-error">Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-10 text-gray-400 italic">No events found. Start by creating one!</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// end================================
// import { useState, useEffect } from "react";
// import api from "../services/api";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
  
//   // Form States
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [location, setLocation] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
  
//   // Edit State
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchMyEvents();
//   }, []);

//   const fetchMyEvents = async () => {
//     try {
//       const res = await api.get("/events/my-events");
//       setEvents(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const eventData = { title, category, location, date, time, description, image };

//     try {
//       if (editingId) {
//         const res = await api.put(`/events/${editingId}`, eventData);
//         setEvents(events.map((ev) => (ev._id === editingId ? res.data : ev)));
//         setEditingId(null);
//         alert("Event Updated Successfully!");
//       } else {
//         const res = await api.post("/events", eventData);
//         setEvents([...events, res.data]);
//         alert("Event Created Successfully!");
//       }
//       resetForm();
//     } catch (err) {
//       alert(err.response?.data?.message || "Operation failed");
//     }
//   };

//   const deleteEvent = async (id) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await api.delete(`/events/${id}`);
//         setEvents(events.filter((ev) => ev._id !== id));
//         alert("Event Deleted!");
//       } catch (err) {
//         alert("Failed to delete event");
//       }
//     }
//   };

//   const startEdit = (ev) => {
//     setEditingId(ev._id);
//     setTitle(ev.title);
//     setCategory(ev.category);
//     setLocation(ev.location);
//     setImage(ev.image || "");
//     const formattedDate = ev.date ? ev.date.split("T")[0] : "";
//     setDate(formattedDate);
//     setTime(ev.time || "");
//     setDescription(ev.description || "");
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setTitle(""); setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription(""); setImage("");
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 mb-20">
//       <h2 className="text-3xl font-extrabold mb-6 text-violet-700 text-center uppercase">
//         {editingId ? "📝 Update Your Event" : "🚀 Create New Event"}
//       </h2>
      
//       {/* ইভেন্ট তৈরির ফর্ম (২-কলাম গ্রিড লেআউট) */}
//       <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 mb-12">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="form-control">
//               <label className="label"><span className="label-text font-bold">Event Name</span></label>
//               <input 
//                 placeholder="Event Title" 
//                 value={title} 
//                 onChange={e => setTitle(e.target.value)} 
//                 className="input input-bordered w-full" 
//                 required 
//               />
//             </div>
//             <div className="form-control">
//               <label className="label"><span className="label-text font-bold">Category</span></label>
//               <select 
//                 value={category} 
//                 onChange={e => setCategory(e.target.value)} 
//                 className="select select-bordered w-full" 
//                 required
//               >
//                 <option value="">Select Category</option>
//                 <option value="Tech">Tech</option>
//                 <option value="Music">Music</option>
//                 <option value="Sports">Sports</option>
//                 <option value="Education">Education</option>
//               </select>
//             </div>
            
//             <div className="form-control">
//               <label className="label"><span className="label-text font-bold">Location</span></label>
//               <input 
//                 placeholder="Location" 
//                 value={location} 
//                 onChange={e => setLocation(e.target.value)} 
//                 className="input input-bordered w-full" 
//                 required 
//               />
//             </div>

//             <div className="form-control">
//               <label className="label"><span className="label-text font-bold">Event Image URL</span></label>
//               <input 
//                 placeholder="https://example.com/photo.jpg" 
//                 value={image} 
//                 onChange={e => setImage(e.target.value)} 
//                 className="input input-bordered w-full" 
//               />
//             </div>

//             <div className="form-control">
//               <label className="label"><span className="label-text font-bold">Date</span></label>
//               <input 
//                 type="date" 
//                 value={date} 
//                 onChange={e => setDate(e.target.value)} 
//                 className="input input-bordered w-full" 
//                 required 
//               />
//             </div>
//             <div className="form-control">
//               <label className="label"><span className="label-text font-bold">Time</span></label>
//               <input 
//                 type="time" 
//                 value={time} 
//                 onChange={e => setTime(e.target.value)} 
//                 className="input input-bordered w-full" 
//               />
//             </div>
//           </div>

//           <div className="form-control">
//             <label className="label"><span className="label-text font-bold">Description</span></label>
//             <textarea 
//               placeholder="Detailed Description" 
//               value={description} 
//               onChange={e => setDescription(e.target.value)} 
//               className="textarea textarea-bordered w-full h-24" 
//             />
//           </div>
          
//           <div className="flex gap-3 pt-4">
//             <button type="submit" className={`flex-1 btn ${editingId ? 'btn-success' : 'btn-primary'} text-white font-bold`}>
//               {editingId ? "Update Event" : "Create Event"}
//             </button>
//             {editingId && (
//               <button type="button" onClick={resetForm} className="btn btn-ghost bg-gray-200">
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* ইভেন্ট লিস্ট সেকশন (কার্ড স্টাইল) */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 italic">📋 My Listed Events</h2>
//       <div className="grid gap-4">
//         {events.length > 0 ? (
//           events.map((ev) => (
//             <div key={ev._id} className="border p-5 rounded-xl flex flex-wrap justify-between items-center bg-white hover:shadow-md transition border-gray-200">
//               <div className="flex-1 min-w-[200px]">
//                 <h3 className="font-bold text-xl text-gray-800">{ev.title}</h3>
//                 <p className="text-violet-700 font-bold">{ev.category}</p>
//                 <p className="text-sm text-gray-500 mt-1">📍 {ev.location} | 📅 {new Date(ev.date).toLocaleDateString()}</p>
//               </div>
              
//               <div className="flex gap-3 mt-4 md:mt-0">
//                 <button 
//                   onClick={() => startEdit(ev)} 
//                   className="btn btn-warning btn-sm text-white"
//                 >
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => deleteEvent(ev._id)} 
//                   className="btn btn-error btn-sm text-white"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//             <p className="text-gray-400 text-lg italic">You haven't created any events yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
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
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  
  // Edit State
  const [editingId, setEditingId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { title, category, location, date, time, description, image };

    try {
      if (editingId) {
        const res = await api.put(`/events/${editingId}`, eventData);
        setEvents(events.map((ev) => (ev._id === editingId ? res.data : ev)));
        setEditingId(null);
        alert("Event Updated Successfully!");
      } else {
        const res = await api.post("/events", eventData);
        setEvents([...events, res.data]);
        alert("Event Created Successfully!");
      }
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

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

  const startEdit = (ev) => {
    setEditingId(ev._id);
    setTitle(ev.title);
    setCategory(ev.category);
    setLocation(ev.location);
    setImage(ev.image || "");
    const formattedDate = ev.date ? ev.date.split("T")[0] : "";
    setDate(formattedDate);
    setTime(ev.time || "");
    setDescription(ev.description || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(""); setCategory(""); setLocation(""); setDate(""); setTime(""); setDescription(""); setImage("");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 mb-20">
      <h2 className="text-3xl font-extrabold mb-8 text-violet-700 text-center uppercase">
        {editingId ? "📝 Update Your Event" : "🚀 Create New Event"}
      </h2>
      
      {/* ১. ইভেন্ট তৈরির ফর্ম (২-কলাম গ্রিড লেআউট) */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 mb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Event Name</span></label>
              <input 
                placeholder="Event Title" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="input input-bordered w-full" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Category</span></label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                className="select select-bordered w-full" 
                required
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Location</span></label>
              <input 
                placeholder="Location" 
                value={location} 
                onChange={e => setLocation(e.target.value)} 
                className="input input-bordered w-full" 
                required 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Event Image URL</span></label>
              <input 
                placeholder="https://example.com/photo.jpg" 
                value={image} 
                onChange={e => setImage(e.target.value)} 
                className="input input-bordered w-full" 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Date</span></label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                className="input input-bordered w-full" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Time</span></label>
              <input 
                type="time" 
                value={time} 
                onChange={e => setTime(e.target.value)} 
                className="input input-bordered w-full" 
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Description</span></label>
            <textarea 
              placeholder="Detailed Description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="textarea textarea-bordered w-full h-24" 
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button type="submit" className={`flex-1 btn ${editingId ? 'btn-success' : 'btn-primary'} text-white font-bold`}>
              {editingId ? "Update Event" : "Create Event"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn btn-ghost bg-gray-200">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ২. ইভেন্ট লিস্ট সেকশন (টেবিল ফরম্যাট) */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-6 bg-violet-50 border-b">
            <h3 className="text-xl font-bold text-violet-800">📋 My Listed Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr className="text-gray-700 text-sm">
                <th>Event Name</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((ev) => (
                  <tr key={ev._id} className="hover">
                    <td>
                      <div className="font-bold text-gray-800">{ev.title}</div>
                      <div className="text-xs opacity-50">{ev.category}</div>
                    </td>
                    <td>
                      <span className="badge badge-ghost font-medium">
                        {new Date(ev.date).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      {/* স্ট্যাটাস লজিক: আজকের তারিখের সাথে তুলনা */}
                      {new Date(ev.date) < new Date() ? (
                        <span className="badge badge-error text-white gap-1">Expired</span>
                      ) : (
                        <span className="badge badge-success text-white gap-1">Active</span>
                      )}
                    </td>
                    <td className="flex justify-center gap-2">
                      <button onClick={() => startEdit(ev)} className="btn btn-sm btn-outline btn-warning">Edit</button>
                      <button onClick={() => deleteEvent(ev._id)} className="btn btn-sm btn-outline btn-error">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-400 italic">No events found. Start by creating one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;