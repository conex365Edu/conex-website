const express = require('express')
const { requireAuth } = require('../middleware/authMiddleware')
const adminControl = require('../controls/adminControl')

const router = express.Router()

router.get('/dashboard', requireAuth, adminControl.getDashboard)

router.get('/speakers', requireAuth, adminControl.getSpeakerDetails)

// @type    GET
// @route   /conexplus
// @desc    Conexplus Dashboard Page
// @access  PRIVATE
router.get('/conexplus', (req, res) => {
  res.render('pages/DashboardPages/ConexPlus')
})

// @type    GET
// @route   /conexspeaker
// @desc    Conexspeaker Dashboard Page
// @access  PRIVATE
router.get('/conexspeaker', (req, res) => {
  res.render('pages/DashboardPages/ConexSpeaker')
})

// @type    GET
// @route   /conexspeaker
// @desc    Conexspeaker Dashboard Page
// @access  PRIVATE
router.get('/incurDash', (req, res) => {
  res.render('pages/DashboardPages/IncurMarketing')
})

// @type    GET
// @route   /subscription
// @desc    Subscription Page
// @access  PRIVATE
// app.get(
//   "/subscription",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   (req, res) => {
//     res.render("pages/DashboardPages/Subscriptions");
//   }
// );

// @type    GET
// @route   /resetmypassword
// @desc    Resetmypassword Dashboard Page
// @access  PRIVATE
router.get('/resetmypassword', (req, res) => {
  res.render('pages/DashboardPages/ResetPassword')
})

// skill card

module.exports = router
