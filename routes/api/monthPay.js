const router = require("express").Router();
const config = require("../../connection/config");
const Insta = require("instamojo-nodejs");
const shortid = require("shortid");
const monthly = require("../../models/monthlyReg");
const bodyParser = require("body-parser");
const passport = require("passport");
const url = require("url");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const { subscribe } = require("../../validation/validation");

router.post("/pay", (req, res) => {
  const { error } = subscribe(req.body);
  res.setHeader("Content-Type", "application/json");
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({
      error: error.details[0].message,
    });
  } else {
    Insta.setKeys(config.API_KEY, config.AUTH_KEY);

    Insta.isSandboxMode(false);
    const data = new Insta.PaymentData();
    //Set the payment values
    const name = req.body.buyer_name;
    const nameres = name.split(" ");
    console.log(nameres);
    data.purpose = "Conex365 Monthly Subscription";
    data.amount = 10;
    data.buyer_name = `${req.body.buyer_name}`;
    data.redirect_url = `http://localhost:80/api/payment365/callback?user_id=${shortid.generate()}&first=${
      nameres[0]
    }&last=${nameres[1]}&email=${req.body.email}&phone=${
      req.body.phone
    }&amount=${data.amount}`;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.send_mail = false;
    data.webhook = "http://www.example.com/webhook/";
    data.send_sms = false;
    data.allow_repeated_payments = false;

    Insta.createPayment(data, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(response);
        const responseData = JSON.parse(response);
        console.log(responseData);
        const redirect_url = responseData.payment_request.longurl;
        console.log(redirect_url);
        res.status(200).json(redirect_url);
        // res.redirect(redirect_url);
      }
    });
  }
});

router.get("/callback/", (req, res) => {
  let url_parts = url.parse(req.url, true);
  console.log(url_parts);
  const responseData = url_parts.query;
  if (responseData.payment_id) {
    let user_id = responseData.user_id;
    let first = responseData.first;
    let last = responseData.last;
    let email = responseData.email;
    let phone = responseData.phone;
    let amount = responseData.amount;
    const newSub = new monthly({
      userId: user_id,
      first: first,
      last: last,
      Phonenumber: phone,
      Email: email,
      Amount: amount,
    });

    newSub.save((err, saved) => {
      if (err) {
        console.log(err);
      } else {
        console.log(saved);
      }
    });
    console.log("Done");
    res.redirect("/Thankusu");

    // const data = {};
    // data.package = "Education Purpose";
    // data.amount = "10";
  } else {
    res.redirect("/PayError");
  }
});

router.get(
  "/subscriptions",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const subscribe = await monthly.find(filter);
    console.log(subscribe);
    res.json(subscribe);
  }
);

module.exports = router;
