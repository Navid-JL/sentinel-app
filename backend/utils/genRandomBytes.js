const crypto = require('crypto')

const genRandomBytes = (length) => {
  let buf = crypto.randomBytes(length)
  buf = buf.toString('hex')
  return buf
}

module.exports = genRandomBytes
