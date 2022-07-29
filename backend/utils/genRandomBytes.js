const crypto = require('crypto')

const genRandomBytes = (length) => {
  let buf = crypto.randomBytes(length).toString('hex')
  return buf
}

module.exports = genRandomBytes
