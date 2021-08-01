const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const db = require('./config/config')
const publicRoutes = require('./routes/publicRoutes')
const incurRoutes = require('./routes/incurRoutes')
const registrationRoutes = require('./routes/registrationRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

//middlewares
// app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(morgan('dev'))

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
app.use('/register', registrationRoutes)
app.use('/incur', incurRoutes)
app.use(authRoutes)
app.use('/admin', adminRoutes)
