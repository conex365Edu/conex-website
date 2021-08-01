const Joi = require('joi')

const loginSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required()
})

const speakerSchema = Joi.object().keys({
  name: Joi.string().required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().required(),
  location: Joi.string().required(),
  areaOfExpertise: Joi.string().required(),
  charge: Joi.number().positive().required()
})

//Login
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

// Speaker
const speaker = (req, res, next) => {
  const { error } = speakerSchema.validate(req.body)
  const valid = error == null

  if (valid) {
    next()
  } else {
    const { details } = error
    const message = details.map(i => i.message).join(',')
    console.log('error', message)
    res.render('pages/conexSpeakerRegistration', {
      error: message,
      message: ''
    })
  }
}

module.exports = {
  login,
  speaker
}
