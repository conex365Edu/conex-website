const express = require('express')
const registrationControl = require('../controls/registrationControl')
const router = express.Router()

// Conex Speaker Registration
router.get('/conexspeaker', registrationControl.getConexSpeaker)
router.post('/conexspeaker', registrationControl.postConexSpeaker)

// Conet Registration
router.get('/conet', registrationControl.getConet)
router.post('/conet', registrationControl.postConet)

// conex plus Registration
router.get('/conexplus', registrationControl.getConexPlus)
router.post('/conexplus', registrationControl.postConexPlus)

module.exports = router
