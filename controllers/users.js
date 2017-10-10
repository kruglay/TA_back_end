const User = require('models/user')

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
      res.render('users/show', { user })
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
    .then(res.redirect('/users'))
    .catch((err) => {
      console.error(err)
      // res.render('users/new')
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