import express from "express";
import { registerUser } from "../controllers/user.controller";
import userRegistrationValidation from "../middlewares/inputValidator";
import inputSanitize from "../middlewares/inputSanitizer";

const userRouter = express.Router();

userRouter.post("/register", inputSanitize, userRegistrationValidation, registerUser);

export default userRouter;
