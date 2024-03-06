import express from "express";
import cors from "cors";
import "dotenv/config";
import { port } from "./constants";
import connectDatabase from "./config/database";
import userRouter from "./routes/users.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRouter);

// Connect to the database and then start the server
connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
