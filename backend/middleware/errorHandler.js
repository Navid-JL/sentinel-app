exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    error_details: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}