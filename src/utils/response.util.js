export const sendResponse = (res, statusCode, success, message, data) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export const errorResponse = (message, statusCode) => {
  const error = new Error(`${message}`);
  error.status = statusCode;
  throw error;
};
