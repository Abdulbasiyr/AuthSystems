

export class AppError extends Error {
  constructor(userMessage, techMessage, statusCode) {
    super()
    this.userMessage = userMessage
    this.techMessage = techMessage
    this.statusCode  = statusCode
  }
}