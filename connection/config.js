const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoURL: process.env.mongoURL,
  tokenSecret: process.env.tokenSecret,
  API_KEY: "a5edb3992df9df5480725ad0a889079f",
  AUTH_KEY: "e60bd4017609091756d7cb231e3dbdb6",
};
