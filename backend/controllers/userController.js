const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const { checkName, checkEmail, checkPassword } = require('../utils/validators/validateInputs')
const encryptPassword = require('../utils/encryptPassword')
const genJWT = require('../utils/genJWT')
const setUserSession = require('../utils/setUserSession')
const bcrypt = require('bcryptjs')

// @desc Register user
// @route POST /api/v1/v1/users/signup
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // Check if name, emal and password are present
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Make sure user has provided the right type of data
  checkName(name, res)
  checkEmail(email, res)
  checkPassword(password, res)
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
    setUserSession(user, req)
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  }
})

// @desc Authenticate user
// @route POST /api/v1/users/login
// @access Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Check if all the required fields are included
  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check whether user's email is standard or not
  checkEmail(email, res)

  // Fetch the user from DB
  const user = await User.findOne({ email }).select('+password')

  // Compare whether user's password match or not
  if (user && (await bcrypt.compare(password, user.password))) {
    // Set loggedIn prop in user's session true
    req.session.regenerate((error) => {
      if (error) {
        throw new Error(error.message)
      } else {
        setUserSession(user, req)
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
        })
      }
    })
  } else {
    await bcrypt.compare(password, user.password)
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Log user out
// @route POST /api/v1/users/logout
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

// @desc Get user info
// @route GET /api/v1/users/me
// @access Private
exports.myInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.session.userId)
  res.json(user)
})

// @desc Update user info
// @route PATCH /api/v1/users/me
// @access Private
exports.updateMe = asyncHandler(async (req, res) => {
  const { name, email } = req.body
  const updatedUser = await User.findByIdAndUpdate(
    req.session.userId,
    { name, email },
    {
      new: true,
    }
  )
  res.json(updatedUser)
})

// @desc Delete user
// @route PATCH /api/v1/users/me
// @access Private
exports.deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.session.userId, { active: false })
  res.json({})
})
