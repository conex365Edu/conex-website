const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mongoURL: process.env.MongoURL,
  tokenSecret: process.env.tokenSecret
}
