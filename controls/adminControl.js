const adminModel = require('../models/adminModel')

const getDashboard = async (req, res) => {
  adminId = res.locals.adminId
  admin = await adminModel.findById(adminId)
  res.render('dashboardPages/dashboard', {
    userName: admin.userName,
    name: admin.name
  })
}

module.exports = {
  getDashboard
}
