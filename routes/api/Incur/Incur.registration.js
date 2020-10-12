const Router = require("express").Router();
const sendMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const transport = nodemailer.createTransport({
  host: "smtp-pulse.com",
  port: 465,
  auth: {
    user: "conex365tech@gmail.com",
    pass: "mp58JBXbb3GoFqi",
  },
});
//Incur Data Model
const IncurApply = require("../../../models/Incur/incur.registration.model");

// @type    GET
// @route   /content/incur/services/incur/apply
// @desc    About Page
// @access  PUBLIC
Router.get("/incur/apply", (req, res) => {
  res.render("incur/incurForm");
});

// @type    GET
// @route   /content/incur/services/incur/apply
// @desc    About Page
// @access  PUBLIC
Router.post("/api/incur/apply", (req, res) => {
  const Name = req.body.Name;
  const Address1 = req.body.Address1;
  const Address2 = req.body.Address2;
  const City = req.body.City;
  const State = req.body.State;
  const Zip = req.body.Zip;
  const Number = req.body.Number;
  const Email = req.body.Email;
  const Gender = req.body.Gender;
  const DOB = req.body.DOB;
  const University = req.body.University;
  const College = req.body.College;
  const Stream = req.body.Stream;
  const RegisterNumber = req.body.RegisterNumber;
  const Percentage = req.body.Percentage;
  const YearOfCompletion = req.body.YearOfCompletion;
  const Remarks = req.body.Remarks;

  IncurApply.findOne(
    {
      Email: Email,
    },
    (err, data) => {
      if (!data) {
        const newReg = IncurApply({
          Name: Name,
          Address1: Address1,
          Address2: Address2,
          City: City,
          State: State,
          Zip: Zip,
          Number: Number,
          Email: Email,
          Gender: Gender,
          DOB: DOB,
          University: University,
          College: College,
          Stream: Stream,
          RegisterNumber: RegisterNumber,
          Percentage: Percentage,
          YearOfCompletion: YearOfCompletion,
          Remarks: Remarks,
        });
        newReg.save((err, saved) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(saved);
            console.log(saved);
            var mailOptions = {
              from: "techsupport@conex365.com",
              to: `${Email}`,
              subject: "Incur Registration",
              text:
                "Thank You for registring in Incur.. Our Conex Team will be in touch with you within 12hrs",
            };
            transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
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


// @type    GET
// @route   /content/incur/services/incur/marketing
// @desc    Incur Marketing
// @access  PUBLIC
Router.get("/incur/marketing", (req, res) => {
  res.render("incur/marketing");
});


// @type    GET
// @route   /content/incur/services/incur/contact
// @desc    Incur Contact
// @access  PUBLIC
Router.get("/incur/contact", (req, res) => {
  res.render("incur/incurContact");
});

module.exports = Router;
