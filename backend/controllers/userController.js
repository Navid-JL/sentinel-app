const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users/register
// @access Public
exports.registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Check if all the required fields are included
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Incomplete credentials')
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  res.send({
    data: user,
  })
})
