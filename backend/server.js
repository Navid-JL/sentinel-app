require('dotenv').config()
const express = require('express')
const cors = require('cors')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

// Connect to the database
connectDB()

// Express API
const app = express()

app.set('trust proxy', 1)

// Implement CORS
app.use(cors())

// Set security HTTP headers
app.use(helmet())

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
})
app.use('/api', limiter)

// Parse incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'imageId',
//     ],
//   })
// )

// API endpoints
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/apod', require('./routes/apodRoutes'))

// Handle wrong url
app.all('*', (req, res, next) => {
  res.status(404)
  next(new Error(`${req.originalUrl} was not found`))
})

// API Error Handler
app.use(errorHandler)

// Listen on the specified port number
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port '.brightWhite + `${PORT}`.brightBlue)
})
