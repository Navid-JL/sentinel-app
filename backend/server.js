require('dotenv').config()
const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// Connect to the database
connectDB()

// Express API
const app = express()

// Parse incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API endpoints
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/apod', require('./routes/apodRoutes'))

// API Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port '.brightWhite + `${PORT}`.brightBlue)
})