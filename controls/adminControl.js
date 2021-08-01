const adminModel = require('../models/adminModel')
const speakerModel = require('../models/speakerModel')
const conetModel = require('../models/conetModel')

const getDashboard = async (req, res) => {
  adminId = res.locals.adminId
  admin = await adminModel.findById(adminId)
  res.render('dashboardPages/dashboard', {
    userName: admin.userName,
    name: admin.name,
    title: admin.name
  })
}

const getSpeakerDetails = async (req, res) => {
  const result = await speakerModel.find({}).lean()
  res.render('dashboardPages/conexSpeaker', {
    result: result,
    title: 'Conex Speakers'
  })
}

const getConetDetails = async (req, res) => {
  const result = await conetModel.find({}).lean()
  res.render('dashboardPages/conet', {
    result: result,
    title: 'Conet List'
  })
}

module.exports = {
  getDashboard,
  getSpeakerDetails,
  getConetDetails
}
