const asyncHandler = require('express-async-handler')
const Apod = require('../models/apodModel')
const { getApod } = require('../apis/apodAPI')
const APIFeatures = require('../helpers/apiFeatures')

exports.getTodayApod = asyncHandler(async (req, res) => {
  const date = new Date().toISOString().substring(0, 10)
  const todayApod = await Apod.findOne({
    date: date,
  })
  res.json(todayApod)
})

exports.getAllApods = asyncHandler(async (req, res) => {
  console.log(req.query)
  const features = new APIFeatures(Apod.find(), req.query).filter().sort().limitFields().paginate()
  const apods = await features.query

  res.json({
    doc_length: apods.length,
    apods,
  })
})
