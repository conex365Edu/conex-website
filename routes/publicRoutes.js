const express = require('express')

const router = express.Router()

//Home Page
router.get('/', (req, res) => {
  res.render('pages/index')
})

// Virtual Training Sections
router.get('/virtual', (req, res) => {
  res.render('pages/virtual', { title: 'VTS' })
})

// On-Site Training Sessions
router.get('/onSite', (req, res) => {
  res.render('pages/onSite', { title: 'OTS' })
})

// Conex to College
router.get('/conextoc', (req, res) => {
  res.render('pages/conexToC', { title: 'C2C' })
})

// ConeX to Industry
router.get('/conextoi', (req, res) => {
  res.render('pages/conexToI', { title: 'C2I' })
})

// NewsLetter
router.get('/conexion', (req, res) => {
  res.render('pages/conexion', { title: 'Conexion' })
})

// about
router.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About Us' })
})

// csr
router.get('/csr', (req, res) => {
  res.render('pages/Csr', { title: 'CSR' })
})

// speakers
router.get('/speaker', (req, res) => {
  res.render('pages/speaker', { title: 'Our Speakers' })
})

// team
router.get('/team', (req, res) => {
  res.render('pages/Team', { title: 'Our Team' })
})

// privacy
router.get('/privacy', (req, res) => {
  res.render('pages/privacy', { title: 'Privacy Statement' })
})

// contact us
router.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact Us' })
})

// Terms of Service
router.get('/TofS', (req, res) => {
  res.render('pages/TofS', { title: 'Terms of Service' })
})

// Cancellation and Refund Policy
router.get('/carfp', (req, res) => {
  res.render('pages/carfp', { title: 'Cancellation and Refund Policy' })
})

// Cancellation and Refund Policy
router.get('/404', (req, res) => {
  res.render('pages/404', { title: '404 Error' })
})

// sample workshop
router.get('/workshop', (req, res) => {
  res.render('pages/workshop', { title: 'Sample Workshop' })
})

module.exports = router
