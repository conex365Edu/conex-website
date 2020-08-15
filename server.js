const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const app = express();

//MongoDB Config Path
const db = require("./connection/config");

//Sub Routes
const admin = require("./routes/api/adminLogin");
const conet = require("./routes/api/conet");

//CSRF Token Dependencies
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });

//Set the view engine to ejs
app.set("view engine", "ejs");

//Mongoose Model
const conetModel = require("./models/Conet");

//Middleware for bodyparser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Passport Authentication
app.use(passport.initialize());

require("./strategy/jwtStrategy")(passport);

//Middleware for cookieparser
app.use(cookieParser());
//Middleware for volleyball
app.use(volleyball);
//Actual Routes
app.use("/api/auth", admin);
app.use("/api/registration", conet);

//Connect to MongoDB
mongoose.connect(
  db.mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connected Successfully");
  }
);

// Empty `filter` means "match all documents"

//Serving Static Files
app.use("/public", express.static(path.join(__dirname, "public")));

//Page Routes
// app.get("/", (req, res) => {
//   res.render("pages/adminLogin");
// });

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/AdminLogin", csrfProtection, (req, res) => {
  res.render("pages/adminLogin", { csrfToken: req.csrfToken() });
});

app.get(
  "/AdminDashboard",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/adminDashboard");
  }
);

app.get(
  "/conet",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const all = await conetModel.find(filter);
    console.log(all);
    res.render("pages/conet", {
      data: all,
    });
  }
);

app.get(
  "/conexplus",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/conexplus");
  }
);

app.get(
  "/conexspeaker",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/conexspeaker");
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
