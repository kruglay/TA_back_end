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
    required: () => (!this.isTheme)
  },
  order: {
    type: Number,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    required: () => (this.order > 0)
  },
  isTheme: {
    type: Boolean
  }
})

module.exports = mongoose.model('Post', schema)