const router = require("express").Router();
const conetModel = require("../../models/Conet");
const { conetregisterValidation } = require("../../validation/validation");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

router.post("/conet", (req, res) => {
  const { error } = conetregisterValidation(req.body);
  res.setHeader("Content-Type", "application/json");
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const email = req.body.Email;
  conetModel.findOne(
    {
      Email: email,
    },
    (err, connetEmail) => {
      if (!connetEmail) {
        const newReg = conetModel({
          Name: req.body.Name,
          Phonenumber: req.body.Phonenumber,
          Email: req.body.Email,
          NativePlace: req.body.NativePlace,
          Expertise: req.body.Expertise,
          Workrole: req.body.Workrole,
          Suggestion: req.body.Suggestion,
        });
        newReg.save((err, user) => {
          if (err) {
            console.log(err);
          } else {
            res.setHeader("Content-Type", "application/json");
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
              Welcome to Conet Platform...We are delighted to serve you as our top priority client.
              Our support team will be in touch with you within 12hrs`,
            };
            mailTransporter.sendMail(mailDetails, function (err, data) {
              if (err) throw err;
              console.log("Email was send successfully" + data.response);
            });
          }
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        // res.json("Email is already Found").status(404);
        return res.status(404).json({
          msg: "User Found with this email",
        });
      }
    }
  );
});

router.get("/conet", async (req, res) => {
  const filter = {};
  const conet = await conetModel.find(filter);
  console.log(conet)
  res.json(conet);
});

router.delete("/conet/:id", (req, res) => {
  console.log(req.params.id);
  conetModel
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
