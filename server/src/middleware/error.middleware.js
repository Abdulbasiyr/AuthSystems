

export function errorHandling(err, req, res, next) {
  console.log(err)
  return res.status(err.statusCode || 500).json({message: err.message || 'Server error, please try later'})
}