const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoURL: process.env.mongoURL,
  tokenSecret: process.env.tokenSecret,
  API_KEY: "test_7f7e6402a43214b8a22c9ddb1a7",
  AUTH_KEY: "test_134ff644692893cc4fbf1f72958",
};
