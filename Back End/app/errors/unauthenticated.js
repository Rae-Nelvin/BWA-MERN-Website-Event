const { StatusCodes } = require("http-status-codes");
const CustomAPIEror = require("./custom-api-error");

class UnauthenticatedError extends CustomAPIEror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
