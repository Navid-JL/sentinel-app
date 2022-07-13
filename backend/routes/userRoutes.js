const express = require('express')
const { registerUser, loginUser, logoutUser } = require('../controllers/userController')

const userRouter = express.Router()

// Sign up user
userRouter.post('/signup', registerUser)

// Log user in
userRouter.post('/login', loginUser)

// Log user out
userRouter.post('/logout', logoutUser)

module.exports = userRouter
