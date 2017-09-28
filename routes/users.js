const express = require('express');
const router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
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
});

router.post('/new', (req, res, next) => {
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
})

router.get('/new', (req, res, next) => {
  console.log("create user")
  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  res.render('users/new')
})

router.get('/:username', (req, res, next) => {
  console.log("create user")
  User.findOne({ username: req.params.username })
    .exec((err, user) => {
      if (err) { throw err }
      res.render('users/show', { user })
    })
    .catch(err => next(err))

})

module.exports = router;
