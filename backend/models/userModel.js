const mongoose = require('mongoose')
const validator = require('validator')
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

// Remove password and __v from user object
userSchema.post('save', async function (next) {
  try {
    this.password = undefined
    this.__v = undefined
  } catch (error) {
    next(error)
  }
})

// Remove inactive users from find queries
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

    return JWTTimestamp < changedTimestamp
  }

  // If not changed
  return false
}

module.exports = mongoose.model('User', userSchema)
