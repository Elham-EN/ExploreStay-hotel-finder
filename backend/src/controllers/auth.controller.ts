import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { jwtSecretKey, nodeEnv } from "../constants";

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // If no user exist
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // otherwise if user exist:
    // check the password that was sent in the request matches the password
    // we have for the user in the database
    const isMatch = await bcrypt.compare(password, user.password);
    // if password is invalid
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // Now email and password of the user is verified:
    // Create access token and return it as part of HTTP cookie
    const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: "1d" });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: 86400000,
    });
    // convenience thing for the frontend client, they userId
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something wrong with server" });
  }
}

export async function sendUserId(req: Request, res: Response) {
  res.status(200).send({ userId: req.userId });
}
