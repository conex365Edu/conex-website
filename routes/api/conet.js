const router = require("express").Router();
const conetModel = require("../../models/Conet");
const { conetregisterValidation } = require("../../validation/validation");

router.post("/conet", (req, res) => {
  const { error } = conetregisterValidation(req.body);
  res.setHeader("Content-Type", "application/json");
  if (error) {
    console.log(error.details[0].message)
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
            res.status(200).send(user);
            console.log(user);

            //Send the Mail to the the client
            console.log(user.Email)
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

module.exports = router;
