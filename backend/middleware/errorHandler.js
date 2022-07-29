exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)

  if (err.code === 11000) {
    res.status(409)
    return res.json({
      message: 'User already exists',
      error_details: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }

  res.json({
    message: err.message,
    error_details: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
