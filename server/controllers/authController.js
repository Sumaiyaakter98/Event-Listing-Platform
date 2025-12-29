import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=>{
  const hashed = await bcrypt.hash(req.body.password,10);
  await User.create({...req.body,password:hashed});
  res.json("Registered");
};

export const loginUser = async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(req.body.password,user.password);
  if(!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({user,token});
};
