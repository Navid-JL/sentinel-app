// API: import dependencies
require('dotenv').config()
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')

// API: Connect to DB
connectDB()

// API: Create express app
const app = express()

// API: Helmet
app.use(helmet())

// API: Log requests into the console
app.use(morgan('dev'))

// API: Cors
app.use(
  cors({
    origin: 'http://localhost:5000',
  })
)

// API: Parse incoming requests
app.use(express.urlencoded({ extended: true, limit: '100kb' }))
app.use(express.json({ limit: '150kb' }))

// API: Parse incoming cookies
app.use(cookieParser())

// API: Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: parseInt(process.env.COOKIE_MAXAGE),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    },
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
