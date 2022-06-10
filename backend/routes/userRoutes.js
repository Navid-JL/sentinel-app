const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, getMe } = require('../controllers/userController')

router.route('/me').get(protect, getMe)

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

module.exports = router
