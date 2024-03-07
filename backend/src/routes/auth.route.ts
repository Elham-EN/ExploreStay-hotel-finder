import express, { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { loginUser } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      next();
    },
  ],
  loginUser
);

export default authRouter;
