const router = require("express").Router();
const conexPlus = require("../../models/conexplus");
const { conexplusregister } = require("../../validation/validation");
const passport = require("passport");
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
        return res.status(404).json({
          msg: "User Found with this email",
        });
      }
    }
  );
});

router.get("/conexplus", async (req, res) => {
  const filter = {};
  const conexplus = await conexPlus.find(filter);
  console.log(conexplus);
  res.json(conexplus);
});

router.delete("/conexplus/:id", (req, res) => {
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
});

module.exports = router;
