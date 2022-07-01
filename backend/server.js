// API: import dependencies
require('dotenv').config()
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')

// API: Connect to DB
connectDB()

// API: create express app
const app = express()

console.log(process.env.MONGO_URI)

// API: Log requests into the console
app.use(morgan('dev'))

// API: Cors
app.use(cors())

// API: Parse incoming requests
app.use(express.urlencoded({ extended: true, limit: '100kb' }))
app.use(express.json({ limit: '150kb' }))

// API: Endpoints
app.use('/api/v1/apod', require('./routes/apodRoutes'))

// API: Handle unknown routes
app.all('*', (req, res, next) => {
  res.status(404)
  next(new Error(`${req.originalUrl} was not found`))
})

// API: Error Handler
app.use(errorHandler)

// API: Listen on a port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port: `.brightWhite + `${PORT}`.brightBlue)
})
