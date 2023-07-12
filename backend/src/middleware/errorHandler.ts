import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : {},
  });
};

export default errorHandler;
