import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecretKey } from "../constants";

// Extend Express Request time add new property
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Get the auth_token from the cookie that
  // was sent from the incoming request
  const token = req.cookies["auth_token"];
  // check if the token exist or not
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    // Verify the token and get the token
    const decoded = jwt.verify(token, jwtSecretKey);
    // Get the user id from the decoded token
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
}

export default verifyToken;
