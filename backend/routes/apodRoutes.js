// Temporary
// apodRouter.route('/populate').get(async (req, res) => {
//   const apods = await getApod({ count: 10 })
//   await Apod.insertMany(apods)
//   res.json(apods)
// })
const express = require('express')
const { getTodayImage, getAllImages, populateApodDb } = require('../controllers/apodController')
const protect = require('../auth/protect')
const apiCache = require('apicache')
let cache = apiCache.middleware

const apodRouter = express.Router()

// Today's image
apodRouter.route('/today').get(protect, cache('2 minutes'), getTodayImage)

// All images
apodRouter.route('/:page?').get(getAllImages)

/* 
    Add protected routes down here
    Multiline comment shortcut => Alt + Shift + A
*/

module.exports = apodRouter
