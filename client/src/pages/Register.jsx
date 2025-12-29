import { useState } from "react";
import api from "../services/api";

const Register = () => {
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10">
      <input className="border w-full p-2 mb-2" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input className="border w-full p-2 mb-2" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" className="border w-full p-2 mb-2" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="bg-green-600 text-white w-full p-2">Register</button>
    </form>
  );
};

export default Register;
