const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  let error = { status: '' }
  const token = req.cookies.jwt

  // check jwt token exists and is verified
  if (token) {
    jwt.verify(token, process.env.jwtSecret, async (err, decodedToken) => {
      if (err) {
        error.status = 'Unauthorised Please Login'
        res.render('/admin', { error: error })
      } else {
        res.locals.adminId = decodedToken.id
        next()
      }
    })
  } else {
    error.status = 'Unauthorised Please Login'
    res.render('/admin', { error: error })
  }
}

module.exports = { requireAuth }
