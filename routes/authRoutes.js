const express = require('express')
const authControl = require('../controls/authControl')
const validation = require('../middleware/validationMiddleware')

const router = express.Router()

// adminLogin
router.get('/admin', authControl.getLogin)

router.post('/admin', validation.login, authControl.postLogin)

// admin Signup Use Postmon
// router.post('/api/signup', authControl.signup)

router.get('/logout', authControl.logout)

module.exports = router
