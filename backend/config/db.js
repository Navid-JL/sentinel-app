const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const colors = require('colors')

const connectDB = asyncHandler(async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  const connectionMessage = `MongoDB connected ${conn.connection.host}`.toUpperCase()
  conn ? console.log(`${connectionMessage}`.brightGreen) : process.exit(1)
})

module.exports = connectDB
