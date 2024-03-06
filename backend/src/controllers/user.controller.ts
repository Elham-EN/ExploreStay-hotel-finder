/**
 * contain the business logic for handling requests and sending responses.
 */

import { Response, Request } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { jwtSecretKey, nodeEnv } from "../constants";

// User to resigter an account
export async function registerUser(req: Request, res: Response) {
  try {
    // Check if user exist
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      // Bad request
      return res.status(400).json({ message: "User already exists with that email" });
    }
    // Otherwise resigter new user to the database
    user = req.body; // body include => firstname, lastname, email & password
    user = new User(req.body);
    await user?.save();
    // This is the token send to the client browser's cookie, userId is used
    // to identify who the user is that is making the request
    const token = jwt.sign({ userId: user?.id }, jwtSecretKey, {
      expiresIn: "1d", // token expire in one day
    });
    res.cookie("auth_token", token, {
      httpOnly: true, // can only be access on the server
      // only accept cookie over https (production)
      secure: nodeEnv === "production",
      maxAge: 8640000, // in millisecond for 1 day
    });
    res.sendStatus(200);
  } catch (error) {
    // Something went wrong with server
    res.status(500).send({ message: "Something with wrong" });
    console.error(error);
  }
}
