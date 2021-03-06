const mongoose = require('../lib/mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,

  },
  text: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Post', schema)