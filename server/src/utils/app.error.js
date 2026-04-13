

export class AppError extends Error {
  constructor(userMessage, statusCode, options = {}) {
    super(options?.techMessage || userMessage) 
    this.name          = this.constructor.name
    this.statusCode    = statusCode || 500
    this.userMessage   = userMessage
    this.techMessage   = options?.techMessage || ''
    this.errorCode     = options?.errorCode || ''
    this.details       = options?.details
    this.isRetryable   = options?.isRetryable
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }

}