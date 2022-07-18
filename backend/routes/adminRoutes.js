const express = require('express')
const authorize = require('../auth/authorize')
const protect = require('../auth/protect')
const { getDashboard } = require('../controllers/adminController')

const adminRouter = express.Router()

adminRouter.get('/dashboard', protect, authorize('admin'), getDashboard)

module.exports = adminRouter
