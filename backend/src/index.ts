import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res;
});

const port = process.env.PORT || 70001;
app.listen(port, () => {
  console.log(`The server is listening to localhost:${port}`);
});
