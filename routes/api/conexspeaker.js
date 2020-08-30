const router = require("express").Router();
const conexspeakermodel = require("../../models/conexspeaker");
const passport = require("passport");
const { conexplusspeaker } = require("../../validation/validation");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const dotenv = require("dotenv");
dotenv.config();

router.post("/conexspeaker", csrfProtection, parseForm, (req, res) => {
  const { error } = conexplusspeaker(req.body);
  res.setHeader("Content-Type", "application/json");
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  const email = req.body.Email;
  conexspeakermodel.findOne(
    {
      Email: email,
    },
    (err, conexspeakeremail) => {
      if (!conexspeakeremail) {
        const newReg = conexspeakermodel({
          Name: req.body.Name,
          Phonenumber: req.body.Phonenumber,
          Email: req.body.Email,
          Location: req.body.Address,
          Expertise: req.body.Expertise,
          Charge: req.body.Charge,
        });
        newReg.save((err, user) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(user);
            console.log(user);
            const username = process.env.user;
            const password = process.env.password;
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
  "/conexspeaker",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const conexspeaker = await conexspeakermodel.find(filter);
    console.log(conexspeaker);
    res.json(conexspeaker);
  }
);

router.delete(
  "/conexplusspeaker/:id",
  csrfProtection,
  parseForm,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    console.log(req.params.id);
    conexspeakermodel
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
