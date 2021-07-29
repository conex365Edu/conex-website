const express = require('express')
const registrationControl = require('../controls/registrationControl')
const router = express.Router()

// Conex Speaker Registration
router.get('/conexspeaker', registrationControl.getConexSpeaker)

// Conet Registration
router.get('/conet', registrationControl.getConet)

// conex plus Registration
router.get('/conexplus', registrationControl.getConexPlus)

module.exports = router
