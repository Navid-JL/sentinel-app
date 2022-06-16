const express = require('express')
const rateLimit = require('express-rate-limit')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  getMe,
  deleteMe,
  updateMe,
} = require('../controllers/userController')

// Limit requests from same API
const authLimiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
})

router.route('/me').get(protect, getMe).delete(protect, deleteMe).put(protect, updateMe)

router.route('/register').post(authLimiter, registerUser)

router.route('/login').post(authLimiter, loginUser)

module.exports = router
