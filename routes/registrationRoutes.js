const express = require('express')
const registrationControl = require('../controls/registrationControl')
const validation = require('../middleware/validationMiddleware')

const router = express.Router()

// Conex Speaker Registration
router.get('/conexspeaker', registrationControl.getConexSpeaker)
router.post(
  '/conexspeaker',
  validation.speaker,
  registrationControl.postConexSpeaker
)

// Conet Registration
router.get('/conet', registrationControl.getConet)
router.post('/conet', validation.conet, registrationControl.postConet)

// conex plus Registration
router.get('/conexplus', registrationControl.getConexPlus)
router.post('/conexplus', registrationControl.postConexPlus)

module.exports = router
