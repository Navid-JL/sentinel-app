const asyncHandler = require('express-async-handler')
const APIFeatures = require('../apis/apiFeatures/apiFeatures')
const Apod = require('../models/Apod')
const { getApod } = require('../apis/apodAPI')

// @desc Get today's apod image
// @route GET /api/v1/apod/today
// @access Public
exports.getTodayImage = asyncHandler(async (req, res) => {
  // Get today's date
  const todayDate = new Date().toISOString().substring(0, 10)
  // Check if today's apod image already exists
  const todayImage = await Apod.findOne({
    date: date,
  })
  // If not send a HTTP request to APOD and persist it to the DB
  if (!todayApod) {
    const newApodImage = await getApod({})
    await Apod.create(newApodImage)
    res.json(newApodImage)
  } else {
    // Send the apod
    res.json({
      todayImage,
    })
  }
})

exports.getAllImages = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Apod.find(), req.query).filter().sort().limitFields().paginate()
  const apods = await features.query

  res.json({
    doc_length: apods.length,
    apods,
  })
})

exports.populateApodDb = async (req, res) => {
  const apods = await getApod({ count: 10 })
  await Apod.insertMany(apods)
  res.json(apods)
}
