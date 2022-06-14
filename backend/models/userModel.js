const mongoose = require('mongoose')
const genToken = require('../helpers/genToken')

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
    refreshToken: [String],
  },
  {
    timestamps: true,
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

module.exports = mongoose.model('User', userSchema)
