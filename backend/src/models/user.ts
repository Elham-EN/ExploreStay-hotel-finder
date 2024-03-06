import mongoose from "mongoose";
import { UserType } from "../types/userType";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  { timestamps: true }
);

// Middleware bycrypt/hash the password: before any update to
// document being save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next(); // proceed to save
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
