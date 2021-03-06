const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendEmail = asyncHandler(async (options) => {
  //   Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  //   Define options for the email
  const mailOptions = {
    from: 'Sentinel Team <noreply@sendgrid.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  //   Send the email
  await transporter.sendMail(mailOptions)
})

module.exports = sendEmail
