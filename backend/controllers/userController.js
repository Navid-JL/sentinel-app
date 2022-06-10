const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../middleware/authMiddleware')

// @desc Register new user
// @route POST /api/users/register
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Check if all the required fields are included
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
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

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: user.tokens[0],
  })
})

// @desc Login user
// @route POST /api/users/login
// @access Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check if all the required fields are included
  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user && !user.checkPassword(password, user.password)) {
    res.status(401)
    throw new Error('Invalid email or password')
  }
  // Get all the tokens from user's tokens list
  let userTokens = user.tokens
  // Generate a new token
  const token = generateToken(user.id)
  // Push the newly generated token to the userTokens array
  userTokens.push(token)
  // Add the new token to the user's tokens list
  const userWithNewToken = await User.findByIdAndUpdate(
    user.id,
    { tokens: userTokens },
    { new: true }
  )

  res.json({
    _id: userWithNewToken.id,
    name: userWithNewToken.name,
    email: userWithNewToken.email,
    token,
  })
})

exports.getMe = asyncHandler(async (req, res) => {
  res.json(req.user)
})
