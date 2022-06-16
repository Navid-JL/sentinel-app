const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { genJWT } = require('../middleware/authMiddleware')
const { encryptPassword } = require('../helpers/encryptPassword')
const bcrypt = require('bcryptjs')
const validator = require('validator')

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

  // Check whether user's name is letter only or not
  if (!validator.isAlpha(name.replace(/\s/g, ''), 'en-GB')) {
    res.status(400)
    throw new Error('Please enter a valid name')
  }

  // Check whether user's email is standard or not
  if (
    !validator.isEmail(email, {
      allow_utf8_local_part: false,
      ignore_max_length: false,
      allow_ip_domain: false,
      domain_specific_validation: true,
      blacklisted_chars: `+ < ) [ & ! ? % # { $ ' " \ : / ^ = ~ ` + '`',
    })
  ) {
    res.status(400)
    throw new Error('Please enter a valid email')
  }

  // Check whether user's password is strong or not
  if (
    validator.isStrongPassword(password, {
      returnScore: true,
    }) < 50
  ) {
    res.status(400)
    throw new Error('Password is not strong enough')
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(409)
    throw new Error('User already exists')
  }

  // Generate salt and hash user's password
  // Register user
  const user = await User.create({
    name,
    email,
    password: await encryptPassword(10, password),
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genJWT(user.id),
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

  // Check whether user's email is standard or not
  if (
    !validator.isEmail(email, {
      allow_utf8_local_part: false,
      ignore_max_length: false,
      allow_ip_domain: false,
      domain_specific_validation: true,
      blacklisted_chars: `+ < ) [ & ! ? % # { $ ' " \ : / ^ = ~ ` + '`',
    })
  ) {
    res.status(400)
    throw new Error('Please enter a valid email')
  }

  const user = await User.findOne({ email }).select('+password')

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genJWT(user.id),
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
