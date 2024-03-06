import mongoose from "mongoose";
import { UserType } from "../types/userType";

const userSchema = new mongoose.Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<UserType>("User", userSchema);

export default User;
