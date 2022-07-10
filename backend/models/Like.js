const mongoose = require('mongoose')

const LikeSchema = mongoose.Schema({
  image: {
    type: mongoose.Schema.ObjectId,
    ref: 'Apod',
    required: [true, 'Like must belong to an image'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Like must belong to a user'],
  },
})

module.exports = mongoose.model('Like', LikeSchema)
