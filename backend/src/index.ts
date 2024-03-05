import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { port } from "./constants";
import connectDatabase from "./config/database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "This just for testing" });
});

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
