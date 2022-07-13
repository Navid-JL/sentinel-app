const asyncHandler = require('express-async-handler')

// @desc Restrict routes based on whether user is authenticated or not
const protect = asyncHandler(async (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    return next()
  }
  res.status(401)
  throw new Error('Not authorized, please log in')
})

module.exports = protect
