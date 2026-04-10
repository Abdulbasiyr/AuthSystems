

export function errorHandling(err, req, res, next) {
  console.log(err)
  if(err.isOperational) {
    return res.status(err.statusCode).json({ message: err.userMessage })
  }
  return res.status(500).json({message: 'Something went wrong. Please try again later'})
}



