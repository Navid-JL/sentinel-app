const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Apod = require('../models/Apod')
const Like = require('../models/Like')
const Session = require('../models/Session')

exports.getDashboard = asyncHandler(async (req, res) => {
  const users = await User.find({})
  const apodImages = await Apod.find({})
  const likes = await Like.find({})
  const sessions = await Session.find({})
  const session = sessions[0]
  console.log(JSON.parse(session['_doc']['session']))
  res.json({
    users_length: users.length,
    apodImages_length: apodImages.length,
    likes_length: likes.length,
    sessions_length: sessions.length,
    users,
    sessions,
    apodImages,
    likes,
  })
})
