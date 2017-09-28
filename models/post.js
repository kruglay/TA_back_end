const mongoose = require('../lib/mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  }
})

module.exports = mongoose.model('Post', schema)