const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')
const db = require('./connection/config')
const publicRoutes = require('./routes/publicRoutes')
const incurRoutes = require('./routes/incurRoute')

// const volleyball = require('volleyball')

const app = express()

//middlewares
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//Jwt Configuration
// const cookieParser = require('cookie-parser')
// const passport = require('passport')

//SSl Configuration
// const forceSSL = require('express-force-ssl')
// const http = require('http')
// const https = require('https')
// const fs = require('fs')

//Security Configuration
// const helmet = require('helmet')

//MongoDB Config Path

//Sub Routes
// const authRoutes = require('./routes/authRoutes')
// const adminRoutes = require('./routes/adminRoutes')
// const conet = require('./routes/conet')
// const conexplus = require('./routes/conexplus')
// const conexspeaker = require('./routes/conexspeaker')
// const monthlyPayment = require('./routes/monthPay')
// const skillcard = require('./routes/SkillCard')

// //Forum Routes
// const forumLogin = require('./routes/api/Forum/Login.Services')

// //Incurex Routes
// const IncurexLogin = require('./routes/api/Incur/Incur.registration')

//CSRF Token Dependencies
// var csrf = require('csurf')
// var csrfProtection = csrf({ cookie: true })

//Mongoose Model
// const conetModel = require('./models/Conet')
// const conexplusModel = require('./models/conexplus')
// const adminModel = require('./models/Admin')
// const speakerModel = require('./models/conexspeaker')

//Middleware for bodyparser

//Passport Authentication
// app.use(passport.initialize())

// require('./strategy/jwtStrategy')(passport)

// //Security Middleware
// // app.use(helmet())
// // app.use(helmet.contentSecurityPolicy());
// app.use(helmet.dnsPrefetchControl())
// app.use(helmet.expectCt())
// app.use(helmet.frameguard())
// app.use(helmet.hidePoweredBy())
// app.use(helmet.hsts())
// app.use(helmet.ieNoOpen())
// app.use(helmet.noSniff())
// app.use(helmet.permittedCrossDomainPolicies())
// app.use(helmet.referrerPolicy())
// app.use(helmet.xssFilter())

// //Middleware for cookieparser
// app.use(cookieParser())

// //Middleware for volleyball
// app.use(volleyball)

// //Actual Routes
// app.use('/api/auth', admin)
// app.use('/api/registration', conet)
// app.use('/api/registration', conexplus)
// app.use('/api/registration', conexspeaker)
// app.use('/api/payment365/', monthlyPayment)

// //Form Main Routes
// app.use('/api/forum/services', forumLogin)

// app.use('/content/incur/services', IncurexLogin)
// app.use('/api/analytics', skillcard)

//Serving Static Files

//MongoDB Connection
mongoose
  .connect(db.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(result => {
    console.log('MongoDB Connected')
    app.listen(3000, () => {
      console.log('Server Running in Port 3000')
    })
  })
  .catch(err => {
    console.log(err)
  })

app.use(publicRoutes)
app.use('/incur', incurRoutes)

// app.use(adminRoutes)
