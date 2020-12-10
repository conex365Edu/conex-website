const Router = require("express").Router();
const passport = require("passport");

//CSRF Token Dependencies
const bodyParser = require("body-parser");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

const SkillModel = require("../../models/SkillCard");
const { skillcard } = require("../../validation/validation");

// @type    GET
// @route   /api/analytics/skillCard
// @desc    SkillCard Dashboard
// @access  PRIVATE
Router.get(
  "/skillCard",
  csrfProtection,
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const data = await SkillModel.find(filter);
    console.log(data);
    res.render("pages/DashboardPages/Skillcard", {
      csrfToken: req.csrfToken(),
    });
  }
);

Router.get(
  "/data",
  csrfProtection,
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const data = await SkillModel.find(filter);
    res.json(data);
    console.log(data);
  }
);

// @type    GET
// @route   /api/analytics/skillCard
// @desc    SkillCard POST ROUTE
// @access  PRIVATE
Router.post(
  "/skillCard",
  passport.authenticate("jwt",{
    session: false,
  }),
  csrfProtection,
  parseForm,
  (req, res) => {
    const { error } = skillcard(req.body);
    res.setHeader("Content-Type", "application/json");
    if (error) {
      console.log(error.details[0].message);
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const Id = req.body.Id;
    const Name = req.body.Name;
    const Organization = req.body.Organization;
    const Phone = req.body.Phone;

    SkillModel.findOne(
      {
        id: Id,
      },
      (err, found) => {
        if (!found) {
          const newCard = SkillModel({
            id: Id,
            name: Name,
            organization: Organization,
            phone: Phone,
          });
          newCard.save((err, cardUser) => {
            if (err) {
              console.log(err);
            } else {
              res.setHeader("Content-Type", "application/json");
              res.status(200).json(cardUser);
              console.log(cardUser);
            }
          });
        } else {
          res.setHeader("Content-Type", "application/json");
          return res.status(404).json({
            msg: "This ID id already registered",
          });
        }
      }
    );
  }
);

Router.delete(
  "/data/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  csrfProtection,
  parseForm,
  (req, res) => {
    SkillModel.findOneAndRemove(
      {
        _id: req.params.id,
      },
      (err, sucess) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: "success",
          });
        }
      }
    );
  }
);
module.exports = Router;
