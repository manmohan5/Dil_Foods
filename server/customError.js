class BaseError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpStatus = httpStatus || 500;
  }
}

class InternalError extends BaseError {
  constructor() {
    super("Internal error. Please contact support", 500);
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(`${message || "Invalid data"}`, 400);
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(resource) {
    super(`${resource || "Resource"} not found`, 404);
  }
}

class RouteNotFoundError extends BaseError {
  constructor() {
    super("API route not found", 404);
  }
}

class AppError extends BaseError {
  constructor(message) {
    super(message || "Application error", 500);
  }
}

class DatabaseError extends BaseError {
  constructor(message) {
    super(message || "Database error", 500);
  }
}

class AuthenticationError extends BaseError {
  constructor(message) {
    super(message || "Invalid authentication", 401);
  }
}

class ForbiddenError extends BaseError {
  constructor(message) {
    super(message || "Requested action forbidden for user", 403);
  }
}

module.exports = {
  ResourceNotFoundError,
  ValidationError,
  AppError,
  DatabaseError,
  AuthenticationError,
  ForbiddenError,
  InternalError,
  RouteNotFoundError,
};
