const mongoose = require('../lib/mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Store', schema)