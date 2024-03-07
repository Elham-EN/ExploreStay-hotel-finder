import mongoose from "mongoose";

export default async function connectDatabase(connection: string) {
  try {
    await mongoose.connect(connection);
    console.log("Connected to mongoDB database");
  } catch (error) {
    console.log("Failed to connect to the database", error);
    // process.exit(1); // Exit app with a failure code
  }
}
