import jwt from "jsonwebtoken";
import User, { IUser } from "../db/models/user";
import bcrypt from "bcrypt";
import UserError from "../errors/UserError";
require("dotenv").config();

const rounds = 10;
const expiryMinutes = 20;

async function signUp(username: string, password: string) {
  let hash = await bcrypt.hash(password, rounds);
  const newUser = new User({ username: username, password: hash });
  newUser.save();
}

async function authenticate(username: string, password: string) {
  let user: IUser | null = await User.findOne({ username: username });
  if (!user) {
    throw UserError.invalidCredentials();
  } else {
    let same = await bcrypt.compare(password, user.password);
    if (same) {
      let expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + expiryMinutes);
      return { authToken: generateToken(user), expiresIn: expiryDate };
    } else {
      throw UserError.invalidCredentials();
    }
  }
}

function generateToken(user: IUser) {
  return jwt.sign({ data: user }, process.env.TOKEN_SECRET ?? "", {
    expiresIn: expiryMinutes + "m",
  });
}

export default {
  signUp,
  authenticate,
};
