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

// @type    GET
// @route   /privacy
// @desc    Privacy Page
// @access  PUBLIC
router.get('/privacy', (req, res) => {
  res.render('pages/privacy')
})

// @type    GET
// @route   /contact
// @desc    Contact Page
// @access  PUBLIC
router.get('/contact', (req, res) => {
  res.render('pages/contact')
})

// @type    GET
// @route   /termsofservice
// @desc    Terms Of Service Page
// @access  PUBLIC
router.get('/TofS', (req, res) => {
  res.render('pages/TofS')
})

// @type    GET
// @route   /carfp
// @desc    Carfp
// @access  PUBLIC
router.get('/carfp', (req, res) => {
  res.render('pages/carfp')
})

// @type    GET
// @route   /ThankYou
// @desc    Thank You Page
// @access  PUBLIC
router.get('/ThankYou', (req, res) => {
  res.render('pages/ThankYou')
})

// @type    GET
// @route   /Certification/MachineLearning
// @desc    Machine Learning Page
// @access  PUBLIC
router.get('/Certification/MachineLearning', (req, res) => {
  res.render('pages/Certifications/MachineLearning')
})

// @type    GET
// @route   /Certification/Python
// @desc    Python Page
// @access  PUBLIC
router.get('/Certification/Python', (req, res) => {
  res.render('pages/Certifications/Python')
})

// @type    GET
// @route   /Certification/DataScience
// @desc    Data Science Page
// @access  PUBLIC
router.get('/Certification/DataScience', (req, res) => {
  res.render('pages/Certifications/DataScience')
})

// @type    GET
// @route   /Certification/BigData
// @desc    Big Data Page
// @access  PUBLIC
router.get('/Certification/BigData', (req, res) => {
  res.render('pages/Certifications/BigData')
})

// @type    GET
// @route   /Certification/Android
// @desc    Android Page
// @access  PUBLIC
router.get('/Certification/Android', (req, res) => {
  res.render('pages/Certifications/Android')
})

// @type    GET
// @route   /Certification/FullStack
// @desc    Full Stack Page
// @access  PUBLIC
router.get('/Certification/FullStack', (req, res) => {
  res.render('pages/Certifications/FullStack')
})

// @type    GET
// @route   /Certification/AWS
// @desc    AWS Page
// @access  PUBLIC
router.get('/Certification/AWS', (req, res) => {
  res.render('pages/Certifications/AWS')
})

// @type    GET
// @route   /Certification/CandCPP
// @desc    CandCPP Page
// @access  PUBLIC
router.get('/Certification/CandCPP', (req, res) => {
  res.render('pages/Certifications/CandCPP')
})

// @type    GET
// @route   /Certification/Java
// @desc    Java Page
// @access  PUBLIC
router.get('/Certification/Java', (req, res) => {
  res.render('pages/Certifications/Java')
})

// @type    GET
// @route   /Certification/DSandAlgorithm
// @desc    DS and Algorithm Page
// @access  PUBLIC
router.get('/Certification/DSandAlgorithm', (req, res) => {
  res.render('pages/Certifications/DSandAlgorithm')
})

// @type    GET
// @route   /Certification/CyberSecurity
// @desc    Cyber Security Page
// @access  PUBLIC
router.get('/Certification/CyberSecurity', (req, res) => {
  res.render('pages/Certifications/CyberSecurity')
})

// @type    GET
// @route   /Certification/BI
// @desc    Cyber Security Page
// @access  PUBLIC
router.get('/Certification/BI', (req, res) => {
  res.render('pages/Certifications/BI')
})

// @type    GET
// @route   /Certification/BI
// @desc    Cyber Security Page
// @access  PUBLIC
router.get('/Certification/PowerBI', (req, res) => {
  res.render('pages/Certifications/PowerBI')
})

// @type    GET
// @route   /Certification/BI
// @desc    Cyber Security Page
// @access  PUBLIC
router.get('/Certification/MSpowerBI', (req, res) => {
  res.render('pages/Certifications/MSpowerBI')
})

// @type    GET
// @route   /ThankYou
// @desc    Thank You Page
// @access  PUBLIC
router.get('/PayError', (req, res) => {
  res.render('pages/PayError')
})

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
router.get('/marketresearch', (req, res) => {
  res.render('pages/workshops/marketResearch')
})

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
router.get('/groomingUpLinkedIn', (req, res) => {
  res.render('pages/workshops/linkedIn')
})

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
router.get('/socialentreprenuership', (req, res) => {
  res.render('pages/workshops/socialEntreprenuership')
})

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
router.get('/branding', (req, res) => {
  res.render('pages/workshops/branding')
})

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
router.get('/yentreprenuer', (req, res) => {
  res.render('pages/workshops/Yentreprenuer')
})

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
router.get('/PowerBIVisual', (req, res) => {
  res.render('pages/workshops/PowerBIVisual')
})

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
router.get('/bioTech', (req, res) => {
  res.render('pages/workshops/bioTech')
})

// @type    GET
// @route   /conexspeakerregistration
// @desc    Conex Speaker Registration Page
// @access  PUBLIC
router.get('/conexspeakerregistration', (req, res) => {
  res.render('pages/RegistrationPages/ConexSpeakerRegistration', {
    csrfToken: req.csrfToken()
  })
})

// @type    GET
// @route   /incur
// @desc    Incur Home
// @access  PUBLIC
router.get('/incur', (req, res) => {
  res.render('incur/index')
})

// @type    GET
// @route   /AdminLogin
// @desc    Admin Login
// @access  PRIVATE
router.get('/AdminLogin', (req, res) => {
  res.render('pages/adminLogin', { csrfToken: req.csrfToken() })
})

// @type    GET
// @route   /conetregistration
// @desc    Conet Registration Page
// @access  PUBLIC
router.get('/conetregistration', (req, res) => {
  res.render('pages/RegistrationPages/ConetRegistration', {
    csrfToken: req.csrfToken()
  })
})

// @type    GET
// @route   /conexplusregistration
// @desc    Conexplus Registration Page
// @access  PUBLIC
router.get('/conexplusregistration', (req, res) => {
  res.render('pages/RegistrationPages/ConexPlusRegistration', {
    csrfToken: req.csrfToken()
  })
})

module.exports = router
