const getConexSpeaker = (req, res) => {
  res.render('pages/conexSpeakerRegistration')
}

const getConet = (req, res) => {
  res.render('pages/conetRegistration')
}

const getConexPlus = (req, res) => {
  res.render('pages/conexPlusRegistration')
}

module.exports = {
  getConexSpeaker,
  getConet,
  getConexPlus
}
