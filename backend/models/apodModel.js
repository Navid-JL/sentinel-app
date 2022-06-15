const mongoose = require('mongoose')
const moment = require('moment')

const apodSchema = new mongoose.Schema(
  {
    copyright: {
      type: String,
      default: 'NASA',
    },
    title: String,
    date: {
      type: String,
      default: moment(Date.now()).format('YYYY-MM-DD'),
    },
    explanation: String,
    hdurl: String,
    media_type: {
      type: String,
      default: 'image',
    },
    service_version: String,
    url: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

// apodSchema.virtual('year').get(function () {
//   return this.date.substr(0, 4)
// })

apodSchema.pre('save', function (next) {
  this.date = moment(this.date).format('YYYY-MM-DD')
  next()
})

module.exports = mongoose.model('Apod', apodSchema)
