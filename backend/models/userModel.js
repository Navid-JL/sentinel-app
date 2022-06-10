const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../middleware/authMiddleware')

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
    tokens: [
      {
        type: String,
      },
    ],
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

// Generate token for new user
userSchema.pre('save', function (next) {
  const token = generateToken(this.id)
  this.tokens.push(token)
  next()
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

// Remove inactive users from find queries
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

// Check whether the passwords match or not
userSchema.methods.checkPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model('User', userSchema)
