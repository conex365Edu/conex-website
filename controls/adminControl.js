const adminModel = require('../models/adminModel')
const speakerModel = require('../models/speakerModel')

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
  const speakers = await speakerModel.find({}).lean()
  res.render('dashboardPages/conexSpeaker', {
    speakers: speakers,
    title: 'Conex Speakers'
  })
}

module.exports = {
  getDashboard,
  getSpeakerDetails
}
