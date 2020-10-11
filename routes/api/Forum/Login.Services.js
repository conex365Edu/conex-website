const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport-jwt");
const key = require("../../../connection/config");
const bodyParser = require("body-parser");

const User = require("../../../models/Forum/User");

router.get("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne(
    {
      email: email,
    },
    (err, ExistEmail) => {
      if (!ExistEmail) {
        return res.status(404).json({
          msg: "User not found with email",
        });
      } else {
        bcrypt.compare(password, ExistEmail.password, (err, isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: ExistEmail.id,
              name: ExistEmail.name,
              email: ExistEmail.email,
            };
            jwt.sign(
              payload,
              key.tokenSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;

                res.cookie("_q3e8bkdl3", token).json({
                  msg: "Authorization",
                });
              }
            );
          } else {
            res.status(400).json({
              msg: "Password is not Correct",
            });
            console.log(err);
          }
        });
      }
    }
  );
});

// @type    POST
// @route   /api/auth/register
// @desc    Route for registeration of users
// @access  PUBLIC
router.post("/register", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, vaildEmail) => {
      if (err) {
        console.log(err);
      }
      if (vaildEmail) {
        res.status(400).json({
          msg: "Username is currently in use",
        });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          workrole: req.body.workrole,
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

router.get("/test", (req, res) => {
  res.send("hi");
});

module.exports = router;
