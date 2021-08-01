const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conexspeakerSchema = new Schema({
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
  location: {
    type: String,
    required: true
  },
  areaOfExpertise: {
    type: String,
    required: true
  },
  charge: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('conexspeaker', conexspeakerSchema)
