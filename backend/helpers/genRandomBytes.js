const crypto = require('crypto')

let buf = crypto.randomBytes(64)
buf = buf.toString('hex')
console.log(buf)
