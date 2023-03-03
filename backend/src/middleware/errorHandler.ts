import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
