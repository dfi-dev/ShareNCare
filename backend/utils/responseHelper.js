// Success response
const successResponse = (res, message, data = {}, code = 200) => {
    res.status(code).json({
      status: "success",
      code,
      message,
      data
    });
  };
  
  // Error response
  const errorResponse = (res, message, errorDetails = {}, code = 400) => {
    res.status(code).json({
      status: "error",
      code,
      message,
      error: errorDetails
    });
  };
  
  module.exports = { successResponse, errorResponse };
  