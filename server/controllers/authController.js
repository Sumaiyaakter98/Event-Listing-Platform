import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ১. চেক করুন ইউজার আগে থেকেই আছে কি না
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ২. পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৩. নতুন ইউজার তৈরি করা (সঠিকভাবে ডাটা পাস করা)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Success message shoho data return
    res.status(201).json({ 
      message: "Registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ১. ইউজার চেক করা
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ২. পাসওয়ার্ড চেক করা
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // ৩. টোকেন তৈরি করা
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // ৪. পাসওয়ার্ড বাদে ইউজার ডাটা আলাদা করা (নিরাপত্তার জন্য)
    const { password: userPassword, ...userData } = user._doc;

    // Success message, user data ebong token pathano holo
    res.status(200).json({
      message: "Login successfully",
      user: userData,
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};