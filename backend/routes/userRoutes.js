const express = require('express')
const router = express.Router()
const { registerController } = require('../controllers/userController')

router.route('/register').post(registerController)

router.route('/').get((req, res) => {
  res.json({
    data: 'User',
  })
})

module.exports = router
