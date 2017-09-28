const router = require('express').Router()
const User = require('../models/user')
const url = require('url')

router.get('/new', (req, res, next) => {
  res.render('sessions/new')
})

router.post('/new', (req, res, next) => {
  let data = req.body
  User.authenticate(data)
    .then(
      user => {
        req.session.user = user
        res.redirect(`/users/${user.username}`)
      }
    )
    .catch((err) => {
      console.error(err)
      next(err)
    })
})

module.exports = router