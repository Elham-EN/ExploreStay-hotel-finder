import mongoose from "mongoose";
import { mongoConnectionString } from "../constants";

export default async function connectDatabase() {
  try {
    await mongoose.connect(mongoConnectionString);
    console.log("Connected to mongoDB database");
  } catch (error) {
    console.log("Failed to connect to the database", error);
    process.exit(1); // Exit app with a failure code
  }
}
