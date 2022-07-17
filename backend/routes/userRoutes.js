const express = require('express')
const { registerUser, loginUser, logoutUser, myInfo } = require('../controllers/userController')
const protect = require('../auth/protect')

const userRouter = express.Router()

// Sign up user
userRouter.post('/signup', registerUser)

// Log user in
userRouter.post('/login', loginUser)

// Log user out
userRouter.post('/logout', protect, logoutUser)

// Get User info
userRouter.get('/me', protect, myInfo)

module.exports = userRouter
