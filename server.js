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
const conexplus = require("./routes/api/conexplus");
const conexspeaker = require("./routes/api/conexspeaker");

//CSRF Token Dependencies
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });

//Set the view engine to ejs
app.set("view engine", "ejs");

//Mongoose Model
const conetModel = require("./models/Conet");
const conexplusModel = require("./models/conexplus");
const adminModel = require("./models/Admin");
const speakerModel = require("./models/conexspeaker");

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
app.use("/api/registration", conexplus);
app.use("/api/registration", conexspeaker);

//Connect to MongoDB
mongoose.connect(
  db.mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
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

app.get("/workshop", (req, res) => {
  res.render("pages/workshop");
});

app.get("/speaker", (req, res) => {
  res.render("pages/speaker");
});

app.get("/conexion", (req, res) => {
  res.render("pages/conexion");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/privacy", (req, res) => {
  res.render("pages/privacy");
});

app.get("/termsofservice", (req, res) => {
  res.render("pages/termsofservice");
});

app.get("/carfp", (req, res) => {
  res.render("pages/carfp");
});

app.get("/workshopdetails", (req, res) => {
  res.render("pages/workshopDetails");
});

app.get("/conetregistration", (req, res) => {
  res.render("pages/Registration_Pages/conetReg");
});

app.get("/conexplusregistration", (req, res) => {
  res.render("pages/Registration_Pages/conexplusReg");
});

app.get("/conexspeakerregistration", (req, res) => {
  res.render("pages/Registration_Pages/conexspeakerReg");
});

app.get("/AdminLogin", csrfProtection, (req, res) => {
  res.render("pages/adminLogin", { csrfToken: req.csrfToken() });
});

app.get(
  "/AdminDashboard",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const filter = {};
    const conet = await conetModel.find(filter);
    const conexPlus = await conexplusModel.find(filter);
    console.log(conet);
    res.render("pages/DashboardPages/Dashboard", {
      data1: conet,
    });
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
    res.render("pages/DashboardPages/Conet", {
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
    res.render("pages/DashboardPages/ConexPlus");
  }
);

app.get(
  "/conexspeaker",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/DashboardPages/ConexSpeaker");
  }
);

app.get(
  "/resetmypassword",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/DashboardPages/ResetPassword");
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
