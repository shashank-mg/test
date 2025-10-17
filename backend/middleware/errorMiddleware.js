const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}   

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  let message = err.message;

  // Check for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode=404;
  }
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}
export { notFound, errorHandler };

// The notFound middleware handles 404 errors by creating a new Error object with a message indicating that the requested URL was not found.
// It sets the response status to 404 and passes the error to the next middleware function using next(error).
// The errorHandler middleware is a centralized error handling function that takes four parameters: err, req, res, and next.
// It checks the current response status code; if it's still 200 (OK), it changes it to 500 (Internal Server Error).
// It then sends a JSON response containing the error message and, if not in production mode, the stack trace for debugging purposes.
