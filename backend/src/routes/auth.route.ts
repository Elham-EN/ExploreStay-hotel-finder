import express, { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { loginUser, sendUserId } from "../controllers/auth.controller";
import verifyToken from "../middlewares/auth";

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
/**
 * When making request to validate token, it first run the middleware function
 * to check the http'scookie which was sent by the client in the request. Once
 * it pass the validation in the middleware, then forward the request to the handler
 */
authRouter.get("/validate-token", verifyToken, sendUserId);

export default authRouter;
