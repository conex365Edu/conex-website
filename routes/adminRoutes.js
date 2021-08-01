const express = require('express')
const { requireAuth } = require('../middleware/authMiddleware')
const adminControl = require('../controls/adminControl')

const router = express.Router()

router.get('/dashboard', requireAuth, adminControl.getDashboard)

router.get('/speakers', requireAuth, adminControl.getSpeakerDetails)

router.get('/conet', requireAuth, adminControl.getConetDetails)

router.get('/conexplus', requireAuth, adminControl.getConexPlusDetails)

module.exports = router
