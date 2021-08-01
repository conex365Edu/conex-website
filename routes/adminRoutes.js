const express = require('express')
const { requireAuth } = require('../middleware/authMiddleware')
const adminControl = require('../controls/adminControl')

const router = express.Router()

router.get('/dashboard', requireAuth, adminControl.getDashboard)

router.get('/speakers', requireAuth, adminControl.getSpeakerDetails)

router.get('/conet', requireAuth, adminControl.getConetDetails)

router.get('/conexplus', requireAuth, adminControl.getConexPlusDetails)

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
