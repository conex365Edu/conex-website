const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  // check jwt token exists and is verified
  if (token) {
    jwt.verify(token, process.env.jwtSecret, async (err, decodedToken) => {
      if (err) {
        res.redirect('/admin')
      } else {
        res.locals.adminId = decodedToken.id
        next()
      }
    })
  } else {
    res.redirect('/admin')
  }
}

module.exports = { requireAuth }
