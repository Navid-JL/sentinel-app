// @desc Restrict routes based on user's role
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['user', 'admin']. role = 'user'
    if (!roles.includes(req.user.role)) {
      res.status(403)
      throw new Error('Forbidden')
    }
    next()
  }
}

module.exports = restrictTo
