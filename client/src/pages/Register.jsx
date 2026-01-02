import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    
    try {
      // API call
      const response = await api.post("/auth/register", form);
      
      if (response.status === 201 || response.status === 200) {
        alert("Registered successfully!");
        navigate("/login"); 
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.message || "Registration failed. Try again!");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <form onSubmit={submit} className="max-w-md mx-auto card bg-base-100 shadow-xl p-8 border border-base-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        <div className="form-control w-full mb-4">
          <input 
            type="text"
            className="input input-bordered w-full" 
            placeholder="Name" 
            required
            onChange={e => setForm({ ...form, name: e.target.value })} 
          />
        </div>

        <div className="form-control w-full mb-4">
          <input 
            type="email"
            className="input input-bordered w-full" 
            placeholder="Email" 
            required
            onChange={e => setForm({ ...form, email: e.target.value })} 
          />
        </div>

        <div className="form-control w-full mb-6">
          <input 
            type="password" 
            className="input input-bordered w-full" 
            placeholder="Password" 
            required
            onChange={e => setForm({ ...form, password: e.target.value })} 
          />
        </div>

        {}
        <button type="submit" className="btn btn-primary w-full text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;