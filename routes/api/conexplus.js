const router = require("express").Router();
const conexPlus = require("../../models/conexplus");

router.post("/conexplus", (req, res) => {
  const email = req.body.email;
  conexPlus.findOne(
    {
      Email: email,
    },
    (err, conexplusEmail) => {
      if (!conexplusEmail) {
        const newReg = conexPlus({
          Name: req.body.Name,
          Phonenumber: req.body.Phonenumber,
          Email: req.body.Email,
          Address: req.body.Address,
          Description: req.body.Description,
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
