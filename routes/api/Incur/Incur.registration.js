const Router = require("express").Router();
const {
  incurRegisteration,
} = require("../Incur/Validation/incur.registration.validate");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
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
Router.get("/incur/apply", csrfProtection, (req, res) => {
  res.render("incur/incurForm", {
    csrfToken: req.csrfToken(),
  });
});

// @type    GET
// @route   /content/incur/services/api/incur/apply
// @desc    About Page
// @access  PUBLIC
Router.post("/api/incur/apply", csrfProtection, parseForm, (req, res) => {
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
        const { error } = incurRegisteration(req.body);
        res.setHeader("Content-Type", "application/json");
        if (error) {
          console.log(error.details[0].message);
          return res.status(400).json({
            error: error.details[0].message,
          });
        }
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
            res.setHeader("Content-Type", "application/json");
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
