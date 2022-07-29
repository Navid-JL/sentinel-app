const passport = require('passport')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const setUserSession = require('../utils/setUserSession')
const GoogleStrategy = require('passport-google-oauth20').Strategy

// serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser(function (user, done) {
  const { id, role } = user
  done(null, { id, role })
})

// deserializeUser is used to retrieve user data from session.
passport.deserializeUser(function (user, done) {
  req.session.regenerate((error) => {
    // if (error) {
    //   throw new Error(error.message)
    // } else {
    // }
    const { id, role } = user
    done(null, { id, role })
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://localhost:5000/api/v1/users/auth/google/callback',
    },
    asyncHandler(async function (accessToken, refreshToken, profile, cb) {
      // Check if user already exists in your db
      const oauthUserExists = await User.findOne({ email: profile._json['email'] })

      if (oauthUserExists) {
        return cb(null, oauthUserExists)
      }

      const oauthUser = await User.create({
        name: profile._json['name'],
        email: profile._json['email'],
      })
      cb(null, oauthUser)
    })
  )
)

// https://localhost:5000/api/v1/users/auth/google
