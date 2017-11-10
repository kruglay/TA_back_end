const User = require('../models/user')

module.exports = function(req, res, next) {
  res.locals.isAuthenticate = false
  req.user = res.locals.user = null
  if (!req.session.user_id) {
    // if (req.method === 'POST' && req.path === '/sessions/new') {
    //   return next()
    // }
    // res.json({isAuthenticate: false})
    next()
  } else {
    User.findById(req.session.user_id).exec()
      .then((user) => {
        res.locals.user = user
        res.locals.isAuthenticate = true
        req.user = user
        next()
      })
      .catch((err) => {
        next(err)
      })
  }
}