const crypto = require('crypto')

const genRandomBytes = () => {
  let buf = crypto.randomBytes(16)
  buf = buf.toString('hex')
  return buf
}

module.exports = genRandomBytes
