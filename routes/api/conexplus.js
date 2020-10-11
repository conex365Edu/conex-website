const router = require("express").Router();
const conexPlus = require("../../models/conexplus");
const { conexplusregister } = require("../../validation/validation");
const passport = require("passport");
const bodyParser = require("body-parser");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

router.post("/conexplus", (req, res) => {
  const { error } = conexplusregister(req.body);

  res.setHeader("Content-Type", "application/json");
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  const email = req.body.Email;
  conexPlus.findOne(
    {
      Email: email,
    },
    (err, conexplusEmail) => {
      if (!conexplusEmail) {
        const newReg = conexPlus({
          Name: req.body.Name,
          Phonenumber: req.body.Phonenumber,
          Email: req.body.Email,
          Address: req.body.Address,
          Description: req.body.Description,
        });
        newReg.save((err, user) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(user);
            console.log(user);
          }
        });
      } else {
        return res.status(404).json({
          msg: "User Found with this email",
        });
      }
    }
  );
});

router.get(
  "/conexplus",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const conexplus = await conexPlus.find(filter);
    console.log(conexplus);
    res.json(conexplus);
  }
);

router.delete(
  "/conexplus/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  csrfProtection,
  parseForm,
  (req, res) => {
    console.log(req.params.id);
    conexPlus
      .findOneAndRemove({
        _id: req.params.id,
      })
      .then(() => {
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
);

module.exports = router;
