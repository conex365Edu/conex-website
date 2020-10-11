const Router = require("express").Router();

Router.get("/registration", (req, res) => {
  res.render("pages/speaker");
});

module.exports = Router;
