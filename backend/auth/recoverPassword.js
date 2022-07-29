const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const sendEmail = require('../utils/email/email')
const crypto = require('crypto')
const setUserSession = require('../utils/setUserSession')
const encryptPassword = require('../utils/encryptPassword')

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on the email received
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(404)
    throw new Error('User was not found')
  }
  // 2) Generate a random reset token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  // 3) Send it to the user's mailbox
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`

  const message = `Forgot your password? Submti a Patch request with your new password to: ${resetURL}\nIf you didn't forget your password please ignore this email!`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    })

    res.json({
      message: `We've sent a reset password link to your mailbox`,
    })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(new Error('There was an error sending the email, try again later!'))
  }
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  // 2) It token hasn't expired and the user exists, set the new password
  if (!user) {
    return next(new Error('Token is invalid or has expired'))
  }
  // Hash user's password using generated salt
  user.password = await encryptPassword(10, req.body.password)
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  // 3) Log the user in and initiate the session
  req.session.regenerate((error) => {
    if (error) {
      throw new Error(error.message)
    } else {
      // Save user's role and id in the session
      setUserSession(user, req)
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
      })
    }
  })
})
