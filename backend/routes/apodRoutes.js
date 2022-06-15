const express = require('express')
const router = express.Router()
const { getTodayApod, getAllApods } = require('../controllers/apodController')

// const { getApod } = require('../apis/apodAPI')
// const Apod = require('../models/apodModel')
// router.route('/test').get(async (req, res) => {
//   const apod = await getApod({ count: 10 })
//   await Apod.insertMany(apod)
//   res.json(apod)
// })

router.route('/').get(getAllApods)

router.route('/today').get(getTodayApod)

module.exports = router
