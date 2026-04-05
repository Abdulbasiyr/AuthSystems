
export class AppError extends Error {
  constructor(userMessage, statusCode, techMessage) {
    this.userMessage = userMessage
    this.statusCode  = statusCode
    this.techMessage = techMessage
  }
}