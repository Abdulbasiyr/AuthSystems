

export function errorHandling(err, req, res, next) {
  console.error(err)
  if(err.isOperational) {
    return res.status(err.statusCode).json({message: err.userMessage, errorCode: err.errorCode, details: err?.details ?? null})
  }

  return res.status(err.statusCode ?? 500).json({message: err.userMessage ?? 'Something went wrong, please try again later', errorCode: err.errorCode ?? 'UNKNOWN_ERROR'})
}


