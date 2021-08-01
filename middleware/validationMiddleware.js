const Joi = require('joi')

const loginSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required()
})

const login = (req, res, next) => {
  const { error } = loginSchema.validate(req.body)
  const valid = error == null

  if (valid) {
    next()
  } else {
    const { details } = error
    const message = details.map(i => i.message).join(',')
    let errors = { userName: '', password: '' }
    errors.password = message
    console.log('error', message)
    res.render('pages/adminLogin', {
      error: errors,
      title: 'Admin Login'
    })
  }
}

module.exports = {
  login
}
