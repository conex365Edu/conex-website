const router = require("express").Router();
const conetModel = require("../../models/Conet");

router.post("/conet", (req, res) => {
  const email = req.body.email;
  conetModel.findOne(
    {
      email: email,
    },
    (err, connetEmail) => {
      if (!connetEmail) {
        return res.status(404).json({
          msg: "User not Found with this email",
        });
      } else {
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
            res.status(200).json(user);
          }
        });
      }
    }
  );
});

module.exports = router;
