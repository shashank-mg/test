const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}   
export default asyncHandler;
// This function takes an asynchronous function (fn) as an argument and returns a new function that wraps the original function in a Promise.
// If the Promise is rejected (i.e., if an error occurs), the error is passed to the next middleware function in the Express.js request-response cycle using next(error).
// This allows for centralized error handling in Express.js applications, making it easier to manage errors in asynchronous route handlers.