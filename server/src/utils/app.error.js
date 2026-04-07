
export class AppError extends Error {
  constructor({
    userMessage,
    techMessage  = '',
    statusCode    = 500,
    isOperational = true,
    errorCode     = null
  }) {
    super(techMessaage || userMessage) 
    this.userMessage   = userMessage 
    this.techMessage   = techMessage 
    this.statusCode    = statusCode 
    this.isOperational = isOperational
    this.errorCode     = errorCode
    this.status        = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.timestamp     = new Date().toISOString()

    Error.captureStackTrace(this, this.constructor)
  }
}

















import { randomUUID } from 'crypto'

export class AppError extends Error {
  constructor({
    userMessage,
    techMessage   = '',
    statusCode    = 500,
    isOperational = true,
    errorCode     = null,
    context       = {},   // NEW: attach extra metadata (userId, endpoint, etc.)
    cause         = null  // NEW: original/upstream error for chaining
  }) {
    super(techMessage || userMessage)

    this.name          = this.constructor.name          // 'AppError' instead of 'Error'
    this.userMessage   = userMessage
    this.techMessage   = techMessage
    this.statusCode    = statusCode
    this.isOperational = isOperational
    this.errorCode     = errorCode
    this.status        = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.timestamp     = new Date().toISOString()
    this.requestId     = randomUUID()                   // NEW: unique ID per error instance
    this.context       = context                        // NEW: structured metadata
    this.cause         = cause                          // NEW: error chaining

    Error.captureStackTrace(this, this.constructor)
  }

  // ─── Serialization ────────────────────────────────────────────────────────

  // What you send to the CLIENT (never expose internals)
  toClientJSON() {
    return {
      status:     this.status,
      statusCode: this.statusCode,
      errorCode:  this.errorCode,
      message:    this.userMessage,
      requestId:  this.requestId,   // so user can report it to support
      timestamp:  this.timestamp
    }
  }

  // What you send to your LOGGER (full detail)
  toLogJSON() {
    return {
      name:          this.name,
      status:        this.status,
      statusCode:    this.statusCode,
      errorCode:     this.errorCode,
      userMessage:   this.userMessage,
      techMessage:   this.techMessage || this.message,
      isOperational: this.isOperational,
      requestId:     this.requestId,
      timestamp:     this.timestamp,
      context:       this.context,
      cause:         this.cause?.message ?? null,
      stack:         this.stack
    }
  }

  // ─── Static factory helpers ───────────────────────────────────────────────

  static notFound(resource = 'Resource') {
    return new AppError({
      userMessage: `${resource} not found`,
      statusCode:  404,
      errorCode:   'NOT_FOUND'
    })
  }
  

  static badRequest(userMessage, context = {}) {
    return new AppError({
      userMessage,
      statusCode: 400,
      errorCode:  'BAD_REQUEST',
      context
    })
  }

  static internal(techMessage, cause = null) {
    return new AppError({
      userMessage:   'An unexpected error occurred. Please try again later.',
      techMessage,
      statusCode:    500,
      isOperational: false,   // flags it as a programmer error, not user error
      errorCode:     'INTERNAL_ERROR',
      cause
    })
  }
}