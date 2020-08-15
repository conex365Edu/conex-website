const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoURL: process.env.mongoURL,
  tokenSecret: process.env.tokenSecret,
};
