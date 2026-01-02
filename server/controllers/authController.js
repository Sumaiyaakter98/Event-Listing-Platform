import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ১. চেক করুন ইউজার আগে থেকেই আছে কি না
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ২. পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৩. নতুন ইউজার তৈরি করা (সঠিকভাবে ডাটা পাস করা)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const loginUser = async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(req.body.password,user.password);
  if(!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({user,token});
};
