const setUserSession = (user, req) => {
  req.session.userId = user.id
  req.session.role = user.role
}

module.exports = setUserSession
