const Router = require("express").Router();
const passport = require("passport");
const shortid = require("shortid");
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
const incurRegistrationModel = require("../../../models/Incur/incur.registration.model");

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
  const RegisterId = shortid.generate();
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
          RegisterId: RegisterId,
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
              text: "Incur Support",
              html: `
              Dear Candidate, <br><br>

              This mail is to confirm your Registration. <br><br>
              <b>Your registration is Completed and Locked.</b> <br><br>

              Get ready to begin your course under our Industry experts and put your skills to test. <br><br>

              <b>InCur Coaches are waiting for you.</b> <br><br>

              Strap up, sit back and relax, while our team  prepares for the best ride you'll ever have. <br><br>

              Our team shall be in touch with you within 10-12 working hours to assist you with the further proceedings and to provide further updates. <br><br>

              <b>You're all geared up and good to go</b> <br><br>

              <p>Your registration ID is <b>${RegisterId}</b></p>

              Regards, <br>
              Team Conex365 <br>
              `,
              attachments: [
                {
                  filename: "brochure.pdf",
                  content: "Incur Brochure",
                  path: "./public/content/brochure.pdf",
                },
              ],
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

Router.get(
  "/incur/dataFetch",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const incurData = await incurRegistrationModel.find(filter);
    console.log(incurData);
    res.json(incurData);
  }
);

module.exports = Router;
