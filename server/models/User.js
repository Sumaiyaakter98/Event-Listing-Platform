import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

export default mongoose.model("User", userSchema);
