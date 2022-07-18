const setUserSession = (user, req) => {
  req.session.loggedIn = true
  req.session.userId = user.id
  req.session.role = user.role
  req.session.device = req.device.type
}

module.exports = setUserSession
