const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../connection/config");
const bodyParser = require("body-parser");
const { resetPassword } = require("../../validation/validation");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

const Admin = require("../../models/Admin");
const { session } = require("passport");

// @type    POST
// @route   /api/auth/register
// @desc    Route for registeration of users
// @access  PUBLIC
router.post("/adminregister", (req, res) => {
  Admin.findOne(
    {
      username: req.body.username,
    },
    (err, validUsername) => {
      if (err) {
        console.log(err);
      }
      if (validUsername) {
        res.status(400).json({
          msg: "Username is currently in use",
        });
      } else {
        const newUser = new Admin({
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            console.log(hash);
            newUser.password = hash;
            newUser.save((err, user) => {
              if (err) {
                console.log(err);
              } else res.status(200).json(user);
            });
          });
        });
      }
    }
  );
});

// @type    POST
// @route   /api/auth/register
// @desc    Route for login of users
// @access  PUBLIC
router.post("/adminlogin", parseForm, csrfProtection, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.findOne(
    {
      username: username,
    },
    (err, ExistUsername) => {
      if (!ExistUsername) {
        return res.status(404).json({
          msg: "User not Found with this email",
        });
      } else {
        bcrypt.compare(password, ExistUsername.password, (err, isCorrect) => {
          if (isCorrect) {
            // res.json({
            //   msg: "User is Authenticated",
            // });
            const payload = {
              id: ExistUsername.id,
              name: ExistUsername.name,
              email: ExistUsername.username,
            };
            //User Payload adn create token for user
            jwt.sign(
              payload,
              key.tokenSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                // res.json({
                //   success: "true",
                //   token: "Bearer " + token
                // })
                res.cookie("jwt", token).json({
                  msg: "Authorization",
                });
              }
            );
          } else {
            res.status(400).json({
              msg: "Password is not corrected",
            });
            console.log(err);
          }
        });
      }
    }
  );
});

router.get("/update", async (req, res) => {
  const filter = {};
  const admin = await Admin.find(filter);
  console.log(admin);
  res.json(admin);
});

router.get("/adminData", async (req, res) => {
  const filter = {};
  const admin = await Admin.find(filter);
  console.log(admin)
  res.json(admin);
});

// // @type    POST
// // @route   /api/auth/update
// // @desc    Update Admin
// // @access  PRIVATE
router.post(
  "/update/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  parseForm,
  csrfProtection,
  (req, res) => {
    const { error } = resetPassword(req.body);
    res.setHeader("Content-Type", "application/json");
    if (error) {
      console.log(error.details[0].message);
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const userValues = {};
    userValues.user = req.params.id;
    if (req.body.name) userValues.name = req.body.name;
    if (req.body.username) userValues.username = req.body.username;
    if (req.body.password) userValues.password = req.body.password;
    console.log(userValues);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userValues.password, salt, (err, hash) => {
        if (err) throw err;
        console.log(hash);
        userValues.password = hash;
      });
    });
    //Find User Using Id
    Admin.findOne(
      {
        _id: req.params.id,
      },
      (err, user) => {
        console.log(user);
        if (err) throw err;
        if (user) {
          Admin.findOneAndUpdate(
            {
              _id: req.params.id,
            },
            {
              $set: userValues,
            },
            {
              new: true,
            },
            (err, userUpdated) => {
              if (err) throw err;
              console.log(userUpdated);
              if (userUpdated) {
                new Admin(userUpdated).save((err, userSaved) => {
                  if (err) throw err;
                  if (userSaved) {
                    res.json(userSaved);
                  }
                });
              }
            }
          );
        }
      }
    );
  }
);

// // @type    GET
// // @route   /api/auth/lgout
// // @desc    logout User
// // @access  PRIVATE
router.get("/logout", function (req, res) {
  //   // req.logout()
  //   res.json({
  //     status: true,
  //   });
  //   res.redirect("/");
  // });
  res.clearCookie("jwt").send({
    redirectTo: "/",
    resStatus: "Success",
    msg: "redirect",
  });
  res.redirect("/");
});

// router.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });

module.exports = router;
