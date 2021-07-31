const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')

// error Handling
const handleError = err => {
  let error = { userName: '', password: '' }

  // email id is already registered
  if (err.code === 11000) {
    error.email = 'Username already exist'
    return error
  }

  // mongoose validation errors
  if (err.message.includes('admin validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message
    })
  }

  // error from login static function in model
  if (err.message === 'Incorrect Username') {
    error.userName = 'User is not registered'
  }

  if (err.message === 'Incorrect Password') {
    error.password = 'Password is Incorrect'
  }
  return error
}

const maxAge = 7 * 24 * 60 * 60

// creating jwt token
const createToken = id => {
  return jwt.sign({ id }, process.env.jwtSecret, {
    expiresIn: maxAge
  })
}

// Login GET request
const getLogin = (req, res) => {
  const error = { userName: '', password: '', status: '' }
  res.render('pages/adminLogin', { title: 'Admin Login', error: error })
}

// Login POST request
const postLogin = async (req, res) => {
  const { userName, password } = req.body
  try {
    const admin = await adminModel.login(userName, password)
    const token = createToken(admin._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.redirect('/admin/dashboard')
  } catch (err) {
    const errors = handleError(err)
    res.render('pages/adminLogin', { error: errors, title: 'Admin Login' })
  }
}

// Signup POST request
// const signup = async (req, res) => {
//   const { userName, password, name } = req.body
//   try {
//     const admin = await adminModel.create({ userName, password, name })
//     const token = createToken(admin._id)
//     res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
//     res
//       .status(200)
//       .json({ id: admin._id, username: admin.userName, name: admin.name })
//   } catch (err) {
//     const errors = handleError(err)
//     res.status(400).json(errors)
//   }
// }

module.exports = {
  getLogin,
  postLogin
  // signup
}
