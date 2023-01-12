const errorHandler = (err, _req, res, _next) => {
  // If no statusCode specified, default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Send stack info in development mode only.
  if (process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({
      message: err.message,
    });
  } else {
    res.status(statusCode).json({ message: err.message, stack: err.stack });
  }
};

module.exports = errorHandler;
