const speakerModel = require('../models/speakerModel')

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

const getConet = (req, res) => {
  res.render('pages/conetRegistration')
}

const getConexPlus = (req, res) => {
  res.render('pages/conexPlusRegistration')
}

module.exports = {
  getConexSpeaker,
  getConet,
  getConexPlus,
  postConexSpeaker
}
