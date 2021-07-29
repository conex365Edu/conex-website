const getLogin = (req, res) => {
  res.render('pages/adminLogin', { title: 'Admin Login' })
}

const postLogin = (req, res) => {}

module.exports = {
  getLogin,
  postLogin
}
