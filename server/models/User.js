// require mongoose
import mongoose from "mongoose";

// Require Schema from mongoose
const Schema = mongoose.Schema;

// Create the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bloked: { type: Boolean, default: false, required: true },
  admin: { type: Boolean, default: false, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
