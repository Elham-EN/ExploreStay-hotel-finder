import express from "express";
import { registerUser } from "../controllers/user.controller";
import userRegistrationValidation from "../middlewares/inputValidator";

const userRouter = express.Router();

userRouter.post("/register", userRegistrationValidation, registerUser);

export default userRouter;
