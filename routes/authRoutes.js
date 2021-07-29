const express = require('express')
const authControl = require('../controls/authControl')

const router = express.Router()

// adminLogin
router.get('/admin', authControl.getLogin)

router.post('/admin', authControl.postLogin)

module.exports = router
