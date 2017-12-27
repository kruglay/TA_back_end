const User = require('models/user')
const Store = require('models/store')
const jwt = require('jsonwebtoken')
const config = require('config')


module.exports.new = (req, res, next) => {
  res.render('sessions/new')
}

module.exports.create = (req, res, next) => {
  let data = req.body
  const { username, password } = data
  User.authenticate({username, password, next})
    .then(
      user => {
        let token = jwt.sign({
          user: user._id.toString(),
          username: user.username,
        }, config.get('jwt:secret'), {expiresIn: '1d'})
        Store.findOneAndUpdate({user: user._id}, {user: user._id, token}, {upsert: true})
          .then((doc) => {
              res.json({
                result: 'success',
                username: user.username,
                user: user._id.toString(),
                token
              })
            }
          )
          .catch(err => {
            console.error(err)
            res.json({result: 'fail'})
          })
      }
    )
    .catch((err) => {
      console.error(err)
      next(err)
    })
}

module.exports.delete = (req, res, next)=> {
  Store
    .findOneAndRemove({user: req.user._id})
    .then(()=>{res.json({result: 'success'})})
    .catch(err=>{
      console.error(err)
      res.json({result: 'fail'})
      next(err)
    })
}