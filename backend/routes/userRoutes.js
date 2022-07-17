const express = require('express')
const {
  registerUser,
  loginUser,
  logoutUser,
  myInfo,
  updateMe,
  deleteMe,
} = require('../controllers/userController')
const protect = require('../auth/protect')

const userRouter = express.Router()

// Sign up user
userRouter.post('/signup', registerUser)

// Log user in
userRouter.post('/login', loginUser)

// Log user out
userRouter.post('/logout', protect, logoutUser)

// Get, update user info
userRouter.route('/me').get(protect, myInfo).patch(updateMe).delete(deleteMe)

module.exports = userRouter
