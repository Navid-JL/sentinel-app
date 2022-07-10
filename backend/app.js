// API: import dependencies
require('dotenv').config()
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const uuid = require('uuid')
const helmet = require('helmet')

// API: Connect to DB
connectDB()

// API: create express app
const app = express()

// API: Helmet
app.use(helmet())

// API: Log requests into the console
app.use(morgan('dev'))

// API: Cors
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

// API: Parse incoming requests
app.use(express.urlencoded({ extended: true, limit: '100kb' }))
app.use(express.json({ limit: '150kb' }))
app.use(cookieParser())

// API: Enable Session
app.use(
  session({
    genid: function (req) {
      return uuid.v4()
    },
    secret: '809e7ad4d206463843c9',
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
)

// API: Endpoints
app.use('/api/v1/apod', require('./routes/apodRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))

// API: Handle unknown routes
app.all('*', (req, res, next) => {
  res.status(404)
  next(new Error(`${req.originalUrl} was not found`))
})

// API: Error Handler
app.use(errorHandler)

module.exports = app
