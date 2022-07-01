const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { genRandomBytes } = require('../helpers/genRandomBytes')

const UserSchema = mongoose.Schema(
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
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

module.exports = mongoose.model('User', UserSchema)
