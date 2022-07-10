const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const { checkName, checkEmail, checkPassword } = require('../utils/validators/validateInputs')
const encryptPassword = require('../utils/encryptPassword')
const genJWT = require('../utils/genJWT')

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
  const userExists = User.findOne({ email }).lean()
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
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      // Send JWT to the user
      token: genJWT(user.id),
    })
  }
})
