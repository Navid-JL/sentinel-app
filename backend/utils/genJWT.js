const jwt = require('jsonwebtoken')

// @desc Generate a JWT token
const genJWT = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET_KEY, {
    expiresIn: '30d',
  })
}

module.exports = genJWT
