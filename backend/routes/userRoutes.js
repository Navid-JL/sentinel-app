const express = require('express')
const passport = require('passport')
const {
  registerUser,
  loginUser,
  logoutUser,
  myInfo,
  updateMe,
  deleteMe,
} = require('../controllers/userController')
const protect = require('../auth/protect')
require('../auth/oauth-google')
const { forgotPassword, resetPassword } = require('../auth/recoverPassword')

const userRouter = express.Router()

// Sign up user
userRouter.post('/signup', registerUser)

// Log user in
userRouter.post('/login', loginUser)

// Log user out
userRouter.post('/logout', protect, logoutUser)

// Get, delete user profile
userRouter.route('/me').get(protect, myInfo).patch(updateMe).delete(deleteMe)

// Google Oauth2.0
passport.initialize()
passport.session()

userRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  function (req, res) {
    // Successful authentication
    res.send('Authenticated')
  }
)

// Recover user's password
userRouter.post('/forgotpassword', forgotPassword)

userRouter.patch('/resetpassword/:token', resetPassword)

module.exports = userRouter
