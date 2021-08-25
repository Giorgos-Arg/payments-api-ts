import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
require("dotenv").config();

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.signUp(req.body.username, req.body.password);
    res.status(200).json({ message: "successful sign up" });
  } catch (error) {
    next(error);
  }
}

async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    let { authToken, expiresIn } = await userService.authenticate(
      req.body.username,
      req.body.password
    );
    res.status(200).json({ authToken: authToken, expiresIn: expiresIn });
  } catch (error) {
    next(error);
  }
}

export default {
  signUp,
  authenticate,
};
