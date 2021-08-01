const express = require('express')
const incurControl = require('../controls/incurControl')

const router = express.Router()

// Home Page
router.get('/', incurControl.getIncureHome)

// Marketing
router.get('/marketing', incurControl.getIncureMarketing)

// Contact Us
router.get('/contact', incurControl.getIncurContact)

module.exports = router
