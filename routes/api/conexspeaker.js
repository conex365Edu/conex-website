const router = require("express").Router();
const conexspeakermodel = require("../../models/conexspeaker");

router.post("/conexspeaker", (req, res) => {
  const email = req.body.Email;
 conexspeakermodel.findOne(
    {
      Email: email,
    },
    (err, conexspeakeremail) => {
      if (!conexspeakeremail) {
        const newReg = conexspeakermodel({
          Name: req.body.Name,
          Phonenumber: req.body.Phonenumber,
          Email: req.body.Email,
          Location: req.body.Address,
          Expertise: req.body.Expertise,
          Charge: req.body.Charge,
        });
        newReg.save((err, user) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(user);
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

module.exports = router;
