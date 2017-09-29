const User = require('../models/user')

module.exports = function(req, res, next) {
  console.log("req.session.user_id", req.session.user_id)
  req.user = res.locals.user = null
  if (!req.session.user_id) return next()
  User.findById(req.session.user_id, (err, user) => {
    console.log(2)
    if (err) next(err)
    res.locals.user = user
    req.user = user
    return next()
  })
}