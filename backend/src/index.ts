import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { frontendUrl, port } from "./constants";
import connectDatabase from "./config/database";
import userRouter from "./routes/users.route";
import authRouter from "./routes/auth.route";
import { mongoConnectionString } from "./constants";
import path from "path";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Allow Server to only accept request from this url only & it must
// include the credential that is the http cookie in the request
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

// Make frontend be part of the backend rather than it's own server
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Connect to the database and then start the server
connectDatabase(mongoConnectionString)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
