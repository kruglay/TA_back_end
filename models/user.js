const mongoose = require('../lib/mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true
  }
})

class UserClass {
  static encriptPassword(password) {
    return crypto.createHmac('sha1', 'this.salt').
      update(password).
      digest('hex');
  }

  static authenticate({ username, password, next }) {
    return this
      .findOne({username: username})
      .exec((err, user) => {
        if (err) {
          throw err
        } else if(!user) {
          err = new Error('User not found')
          throw err
        }
        if (user.password === this.encriptPassword(password)) {
          return user
        } else {
          err = new Error('Wrong password')
          throw err
        }
      })
      .catch(
        (err) => next(err)
      )
  }
}

schema.loadClass(UserClass)
schema.pre('save', function(next){
  this.password = UserClass.encriptPassword(this.password)
  next()
})

module.exports = mongoose.model('User', schema)