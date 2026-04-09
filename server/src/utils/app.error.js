

export class AppError extends Error {
  constructor(userMessage, techMessage = '', statusCode = 500, isOperational = true) {
    super(techMessage || userMessage)
    this.techMessage = techMessage,
    this.statusCode  = statusCode
  }
}