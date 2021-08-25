import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

function verify(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      error: {
        code: "ERR_UNAUTHORIZED",
        message: "No auth token provided",
      },
    });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET ?? "", (err) => {
      if (err) {
        if (err.message === "TokenExpiredError") {
          res.status(401).json({
            error: {
              code: "ERR_AUTH_TOKEN_EXPIRED",
              message: "Auth token expired",
            },
          });
        } else {
          res.status(401).json({
            error: {
              code: "ERR_UNAUTHORIZED",
              message: "Token authentication failed",
            },
          });
        }
      } else {
        next();
      }
    });
  }
}

export default {
  verify,
};
