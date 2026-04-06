
export class AppError extends Error {
  constructor({
    userMessage,
    techMessaage  = '',
    statusCode    = 500,
    isOperational = true,
    errorCode     = null
  }) {
    super(techMessaage || userMessage) 
    this.userMessage   = userMessage 
    this.techMessaage  = techMessaage 
    this.statusCode    = statusCode 
    this.isOperational = isOperational
    this.errorCode     = errorCode
    this.status        = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor)
  }
}