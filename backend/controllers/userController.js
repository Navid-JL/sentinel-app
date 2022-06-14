const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const genToken = require('../helpers/genToken')
const bcrypt = require('bcryptjs')

// @desc Register new user
// @route POST /api/users/register
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Check if all fields are present
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(409)
    throw new Error('User already exists')
  }

  // Generate salt and hash user's password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Register user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
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

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    // Get all the tokens from user's tokens list
    let userTokens = user.tokens
    // Generate a new token
    const token = genToken(user.id)
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
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Get user
// @route GET /api/users/me
// @access Private
exports.getMe = asyncHandler(async (req, res) => {
  res.json(req.user)
})

// @desc Update user
// @route PUT /api/users/me
// @access Private
exports.updateMe = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, password },
    { new: true }
  )
  res.json(updatedUser)
})

// @desc Delete user
// @route DELETE /api/users/me
// @access Private
exports.deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false }, { new: true })
  res.json({})
})
