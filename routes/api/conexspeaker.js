const router = require("express").Router();
const conexspeakermodel = require("../../models/conexspeaker");
const { conexplusspeaker } = require("../../validation/validation");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

router.post("/conexspeaker", (req, res) => {
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
            //Send the Mail to the the client
            const mailTransporter = nodemailer.createTransport({
              service: process.env.service,
              auth: {
                user: username,
                pass: password,
              },
            });

            const mailDetails = {
              from: "paulprince24542@gmail.com",
              to: user.Email,
              subject: "Welcome to Conet Platform Provided by Conex365 ",
              body: `Hi ${user.Email}
              Welcome to Conex Speaker Platform...We are delighted to have you as our Speaker.
              Our support team will be in touch with you within 12hrs`,
            };
            mailTransporter.sendMail(mailDetails, function (err, data) {
              if (err) throw err;
              console.log("Email was send successfully" + data.response);
            });
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

router.delete("/conexplusspeaker/:id", (req, res) => {
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
});
module.exports = router;
