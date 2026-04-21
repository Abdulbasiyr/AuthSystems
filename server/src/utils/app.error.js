

export class AppError extends Error {
  constructor({
    userMessage = null, 
    statusCode = 500,
    techMessage = null,
    errorCode   = 'UNKNOW ERROR',
    details     = null
    }) {
    super(options?.techMessage ?? userMessage ?? 'Unknow Error') 
    this.name          = this.constructor.name
    this.statusCode    = statusCode ?? 500
    this.userMessage   = userMessage
    this.techMessage   = techMessage
    this.errorCode     = errorCode
    this.details       = details
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }

}