class ApiError extends Error {
    constructor(statusCode, message) {
        super(message); // calls Error constructor
        this.statusCode = statusCode;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;