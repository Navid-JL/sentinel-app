const express = require('express')
const { getTodayImage, getAllImages, populateApodDb } = require('../controllers/apodController')

const apodRouter = express.Router()

// Today's image
apodRouter.route('/today', getTodayImage)

// Temporary
/* TODO 
Remove this route once it has served its purpose
*/
apodRouter.route('/populate').get(populateApodDb)

// All images
apodRouter.route('/:page?').get(getAllImages)

module.exports = apodRouter
