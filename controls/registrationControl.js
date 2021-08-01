const speakerModel = require('../models/speakerModel')
const conetModel = require('../models/conetModel')

// Speaker Registration
const getConexSpeaker = (req, res) => {
  res.render('pages/conexSpeakerRegistration', { error: '', message: '' })
}

const postConexSpeaker = async (req, res) => {
  let error
  const data = req.body
  try {
    await speakerModel.create(data)
    res.render('pages/conexSpeakerRegistration', {
      message: 'Speaker Successfully Registered. Please wait for confirmation',
      error: ''
    })
  } catch (err) {
    console.log(err)
    // email id is already registered
    if (err.code === 11000) {
      error = 'email already exist'
    }
    error = 'Registration Failed. Please try again'
    res.render('pages/conexSpeakerRegistration', {
      error: error,
      message: ''
    })
  }
}

// Conet Registration
const getConet = (req, res) => {
  res.render('pages/conetRegistration', { error: '', message: '' })
}

const postConet = async (req, res) => {
  let error
  const data = req.body
  try {
    await conetModel.create(data)
    res.render('pages/conetRegistration', {
      message: 'Successfully Registered. Please wait for confirmation',
      error: ''
    })
  } catch (err) {
    console.log(err)
    // email id is already registered
    if (err.code === 11000) {
      error = 'email already exist'
    }
    error = 'Registration Failed. Please try again'
    res.render('pages/conetRegistration', {
      error: error,
      message: ''
    })
  }
}

const getConexPlus = (req, res) => {
  res.render('pages/conexPlusRegistration')
}

module.exports = {
  getConexSpeaker,
  getConet,
  getConexPlus,
  postConexSpeaker,
  postConet
}
