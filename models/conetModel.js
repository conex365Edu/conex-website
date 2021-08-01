const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conetSchema = new Schema({
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
  nativePlace: {
    type: String,
    required: true
  },
  areaOfExpertise: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('conet', conetSchema)
