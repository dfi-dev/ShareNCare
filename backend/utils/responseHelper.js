const successResponse = (res, message, data = {}, statusCode = 200, meta = null) => {
  return res.status(statusCode).json({
    status: "success",
    code: statusCode,
    message,
    data,
    meta,
    timestamp: new Date().toISOString(),
  });
};

const errorResponse = (res, message, error = {}, statusCode = 500, path = null) => {
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    error,
    path,
    timestamp: new Date().toISOString(),
  });
};

  module.exports = { successResponse, errorResponse };
  