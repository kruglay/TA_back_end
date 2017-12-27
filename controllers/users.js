const User = require('models/user')
const jwt = require('jsonwebtoken')
const Store = require('models/store')
const config = require('config')

exports.get = function (req, res, next) {
  console.log("users")
  User.find({}).exec()
    .then((users) => {
      console.log(users)
      res.render('users/index', { users: users })
    })
    .catch((err) => {
      res.statusCode = 404
      console.log(err)
    });
}

exports.show = function(req, res, next) {
  console.log(req.params.username)
  let params = req.params
  User.findOne({ username: params.username })
    .exec()
    .then((user) => {
      res.json({
        email: user.email,
      })
      // res.render('users/show', { user })
    })
    .catch(err => next(err))
}

exports.create = function (req, res, next) {
  console.log("create user")
  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  User.create(user)
    // .then(res.redirect('/users'))
    .then(user=>{
      let token = jwt.sign({
        user: user._id.toString(),
        username: user.username,
      }, config.get('jwt:secret'), {expiresIn: '1d'})
      Store.create({user: user._id, token})
        .then(store=>{
          res.json({
            result:'success',
            token: token,
            user: user._id.toString(),
          })
        })
        .catch(error => {
          console.log(error)
          res.json({result:'success'})
        })
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
}

exports.new = function(req, res, next) {
  console.log("create user")
  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  res.render('users/new')
}