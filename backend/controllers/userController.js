const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const { checkName, checkEmail, checkPassword } = require('../utils/validators/validateInputs')
const encryptPassword = require('../utils/encryptPassword')
const genJWT = require('../utils/genJWT')
const bcrypt = require('bcryptjs')

// @desc Register user
// @route POST /api/v1/users/signup
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // Check if name, emal and password are present
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Make sure user has provided the right type of data
  checkName(name)
  checkEmail(email)
  checkPassword(password)
  // Check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(409)
    throw new Error('User already exists')
  }
  // Register user
  const user = await User.create({
    name,
    email,
    // Hash user's password using generated salt
    password: await encryptPassword(10, password),
  })
  // If user is successfully registered
  if (user) {
    // Set loggedIn true in user's session
    req.session.loggedIn = true
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  }
})

// @desc Authenticate user
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
  checkEmail(email)

  // Fetch the user from DB
  const user = await User.findOne({ email }).select('+password')

  // Compare whether user's password match or not
  if (user && (await bcrypt.compare(password, user.password))) {
    // Set loggedIn prop in user's session true
    req.session.loggedIn = true
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Log user out
// @route POST /api/users/logout
// @access Private
exports.logoutUser = asyncHandler(async (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      req.session = null
      if (error) {
        throw new Error(error.message)
      } else {
        return res.json({ logout: true })
      }
    })
  }
})
