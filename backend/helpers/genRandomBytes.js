const crypto = require('crypto')

exports.genRandomBytes = () => {
  let buf = crypto.randomBytes(64)
  buf = buf.toString('hex')
  console.log(buf)
}
