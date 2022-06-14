const jwt = require('jsonwebtoken')

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '10m',
  })
}

module.exports = genToken
