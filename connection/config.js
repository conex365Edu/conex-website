const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mongoURL: process.env.MongoURL,
  tokenSecret: process.env.tokenSecret,
  API_KEY: 'a5edb3992df9df5480725ad0a889079f',
  AUTH_KEY: 'e60bd4017609091756d7cb231e3dbdb6',
  API_KEY_TEST: 'test_7f7e6402a43214b8a22c9ddb1a7',
  AUTH_KEY_TEST: 'test_134ff644692893cc4fbf1f72958'
}
