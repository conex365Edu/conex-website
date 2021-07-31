const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

//Mongoose Hooks for hashing password
AdminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// static method for admin login
AdminSchema.statics.login = async function (userName, password) {
  const admin = await this.findOne({ userName })
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password)
    if (auth) {
      return admin
    }
    throw Error('Incorrect Password')
  }
  throw Error('Incorrect Username')
}

module.exports = mongoose.model('Admin', AdminSchema)
