const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: 12,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

// Hash password
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
    return next()
  } catch (error) {
    return next(error)
  }
})

// Remove password and __v from user object
userSchema.post('save', async function (next) {
  try {
    this.password = undefined
    this.__v = undefined
  } catch (error) {
    next(error)
  }
})

// userSchema.pre(/^find/, function(next) {

// })

module.exports = mongoose.model('User', userSchema)
