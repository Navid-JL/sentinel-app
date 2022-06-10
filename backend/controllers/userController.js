const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users/register
// @access Public
exports.registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Incomplete credentials')
  }

  let user = await User.create({
    name,
    email,
    password,
  })

  res.send({
    data: user,
  })
})
