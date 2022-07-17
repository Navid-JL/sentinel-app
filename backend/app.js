// API: import dependencies
require('dotenv').config()
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
// const csurf = require('csurf');
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')

// API: Connect to DB
connectDB()

// API: Create express app
const app = express()

// API: Set this if express is behind a reverse proxy
app.set('trust proxy', 1)

// API: Security Measures
app.use(helmet())

// Clickjacking
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'")
  next()
})

// API: Log requests
morgan.token('tuna', function (req, res, param) {
  return req.sessionID
})
morgan.token('user', function (req, res, param) {
  return req.session.userId
})
app.use(
  process.env.NODE_ENV === 'production'
    ? morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :user :tuna'
      )
    : morgan('dev')
)

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
app.use(cookieParser(process.env.SESSION_SECRET))

// API: Session
app.use(
  session({
    secret: [process.env.SESSION_SECRET],
    name: process.env.SESSION_NAME,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: parseInt(process.env.COOKIE_MAXAGE),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
    },
  })
)

// API: Endpoints
app.use('/api/v1/apod', require('./routes/apodRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))

const Like = require('./models/Like')
app.post('/like', async (req, res) => {
  const { image } = req.body
  const user = req.session.userId
  const like = await Like.create({
    image,
    user,
  })

  res.json(like)
})

app.get('/find/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)
  const result = await Like.findById(id).populate('image').populate('user')
  res.send(result)
})

// API: Handle unknown routes
app.all('*', (req, res, next) => {
  res.status(404)
  next(new Error(`${req.originalUrl} was not found`))
})

// API: Error Handler
app.use(errorHandler)

module.exports = app
