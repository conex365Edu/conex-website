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
  console.log(conet);
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
