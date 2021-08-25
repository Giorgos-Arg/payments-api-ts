import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import CustomError from "./CustomError";
import mongoose from "mongoose";

function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  } else if (err instanceof mongoose.Error.ValidationError) {
    let errorDetails: { code: string; message: string }[] = [];

    for (let key in err.errors) {
      let e: mongoose.Error = err.errors[key];
      errorDetails.push({
        code: e.name,
        message: e.message,
      });
    }

    let validationErr = {
      code: "ERR_VALIDATION",
      message: "Validation failed",
      details: errorDetails,
    };

    return res.status(400).json(validationErr);
  }

  res.status(500).json("something went wrong");
}

export default errorHandler;
