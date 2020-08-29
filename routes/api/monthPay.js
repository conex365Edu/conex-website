const router = require("express").Router();
const config = require("../../connection/config");
const Insta = require("instamojo-nodejs");
const shortid = require("shortid");
const monthly = require("../../models/monthlyReg");

router.post("/pay", (req, res) => {
  Insta.isSandboxMode(true);
  const data = new Insta.PaymentData();
  //Set the payment values
  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.buyer_name = req.body.buyer_name;
  data.redirect_url = `http://localhost:3000/api/payment365/callback?user_id=${shortid.generate()}&name=${
    req.body.buyer_name
  }&email=${req.body.email}&phone=${req.body.phone}&amount=${data.amount}`;
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
});

router.get("/callback/", (req, res) => {
  const url = require("url");
  let url_parts = url.parse(req.url, true);
  console.log(url_parts);
  const responseData = url_parts.query;
  if (responseData.payment_id) {
    let user_id = responseData.user_id;
    let name = responseData.name;
    let email = responseData.email;
    let phone = responseData.phone;
    console.log("Done");
    res.redirect("/paymentc");

    const data = {};
    // data.package = "Education Purpose";
    // data.amount = "10";
  }
});

module.exports = router;
