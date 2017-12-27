const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
  res.locals.isAuthenticate = false
  req.user = res.locals.user = null
  if (!req.body.token) {
    // if (req.method === 'POST' && req.path === '/sessions/new') {
    //   return next()
    // }
    // res.json({isAuthenticate: false})
    next()
  } else {
    jwt.verify(req.body.token, config.get('jwt:secret'),(err, decoded)=>{
      if (err) throw err
      User.findById(decoded.user).exec()
        .then((user) => {
          res.locals.user = user
          res.locals.isAuthenticate = true
          req.user = user
          next()
        })
        .catch((err) => {
        next(err)
      })
    })
  }
}