const User = require('../models/user')

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