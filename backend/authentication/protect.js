const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

// @desc Restrict routes based on whether user is authenticated or not
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET)

      // Get user from the token and check if it still exists
      const authorizedUser = await User.findById(decoded.id).select('-password')
      if (!authorizedUser) {
        res.status(401)
        throw new Error('The user pertaining to this token is no longer valid')
      }

      // Check if user changed password after the token was changed
      if (authorizedUser.changedPasswordAfter(decoded.iat)) {
        res.status(401)
        throw new Error('Password has been changed, please login again')
      }

      // Grant access
      req.user = authorizedUser
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error(error.message)
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = protect
