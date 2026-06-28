import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api", 
  baseURL: window.location.hostname === "localhost"
   ? "http://localhost:5000/api"
   : "https://event-listing-platform-three.vercel.app/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
