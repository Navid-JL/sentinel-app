const validator = require('validator')

exports.checkName = (name, res) => {
  if (!validator.isAlpha(name.replace(/\s/g, ''), 'en-GB')) {
    res.status(400)
    throw new Error('Please enter a valid name')
  }
}

exports.checkEmail = (email, res) => {
  if (
    !validator.isEmail(email, {
      allow_utf8_local_part: false,
      ignore_max_length: false,
      allow_ip_domain: false,
      domain_specific_validation: true,
      blacklisted_chars: `+ < ) [ & ! ? % # { $ ' " \ : / ^ = ~ ; ,` + '`',
    })
  ) {
    res.status(400)
    throw new Error('Please enter a valid email')
  }
}

exports.checkPassword = (password, res) => {
  if (
    validator.isStrongPassword(password, {
      returnScore: true,
    }) < 50
  ) {
    res.status(400)
    throw new Error('Password is not strong enough')
  }
}
