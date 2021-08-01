const getIncureHome = (req, res) => {
  res.render('incur/index', { title: 'Incur || Conex 365' })
}

const getIncureMarketing = (req, res) => {
  res.render('incur/marketing', { title: 'Incur || Marketing' })
}

const getIncurContact = (req, res) => {
  res.render('incur/contact', { title: 'Incur || Contact' })
}

module.exports = {
  getIncureHome,
  getIncureMarketing,
  getIncurContact
}
