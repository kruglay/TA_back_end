const User = require('models/user')

module.exports.new = (req, res, next) => {
  res.render('sessions/new')
}

module.exports.create = (req, res, next) => {
  let data = req.body
  User.authenticate(data)
    .then(
      user => {
        req.session.user_id = user._id.toString()
        res.redirect(`/users/${user.username}`)
      }
    )
    .catch((err) => {
      console.error(err)
      next(err)
    })
}

module.exports.delete = (req, res, next)=> {
  req.session.destroy();
  res.redirect('/')
}