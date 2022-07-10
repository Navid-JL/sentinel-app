const express = require('express')
const { registerUser } = require('../controllers/userController')

const userRouter = express.Router()

// Sign up user
userRouter.post('/signup', registerUser)

module.exports = userRouter
