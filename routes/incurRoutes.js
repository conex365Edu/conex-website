const express = require('express')
const incurApplyControl = require('../controls/incurApplyControl')

const router = express.Router()

// Home Page
router.get('/', (req, res) => {
  res.render('incur/index', { title: 'Incur || Conex 365' })
})

// Marketing
router.get('/marketing', (req, res) => {
  res.render('incur/marketing', { title: 'Incur || Marketing' })
})

// Contact Us
router.get('/contact', (req, res) => {
  res.render('incur/contact', { title: 'Incur || Contact' })
})

// Marketing Apply Form
router.get('/marketing/apply', incurApplyControl.getIncureMarketing)

module.exports = router
