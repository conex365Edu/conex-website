const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conetplusSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 50
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('conexplus', conetplusSchema)
