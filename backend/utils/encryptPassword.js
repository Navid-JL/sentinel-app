const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

exports.encryptPassword = asyncHandler(async (round, password) => {
  const salt = await bcrypt.genSalt(round)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
})
