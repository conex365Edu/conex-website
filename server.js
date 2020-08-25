const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const http = require("http");
const forceSSL = require('express-force-ssl');
const path = require("path");
const app = express();

//SSl Configuration
const https = require("https");
const fs = require("fs");
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
app.use(forceSSL);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Passport Authentication
app.use(passport.initialize());

require("./strategy/jwtStrategy")(passport);

//SSL Middleware

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

//Serving Static Files
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/workshop", (req, res) => {
  res.render("pages/workshop");
});

app.get("/trainings", (req, res) => {
  res.render("pages/Trainings");
});

app.get("/virtual", (req, res) => {
  res.render("pages/Virtual");
});

app.get("/onSite", (req, res) => {
  res.render("pages/Onsite");
});

app.get("/conextoc", (req, res) => {
  res.render("pages/Conextoc");
});

app.get("/conextoi", (req, res) => {
  res.render("pages/Conextoi");
});

app.get("/conetregistration", csrfProtection, (req, res) => {
  res.render("pages/RegistrationPages/ConetRegistration", {
    csrfToken: req.csrfToken(),
  });
});

app.get("/conexplusregistration", csrfProtection, (req, res) => {
  res.render("pages/RegistrationPages/ConexPlusRegistration", {
    csrfToken: req.csrfToken(),
  });
});

app.get("/conexion", (req, res) => {
  res.render("pages/conexion");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/objectives", (req, res) => {
  res.render("pages/Objectives");
});

app.get("/csr", (req, res) => {
  res.render("pages/Csr");
});

app.get("/speaker", (req, res) => {
  res.render("pages/speaker");
});

app.get("/team", (req, res) => {
  res.render("pages/Team");
});

app.get("/privacy", (req, res) => {
  res.render("pages/Privacy");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/termsofservice", (req, res) => {
  res.render("pages/termsofservice");
});

app.get("/carfp", (req, res) => {
  res.render("pages/carfp");
});

app.get("/ThankYou", (req, res) => {
  res.render("pages/ThankYou");
});

app.get("/workshopdetails", (req, res) => {
  res.render("pages/workshopDetails");
});

app.get("/conexspeakerregistration", csrfProtection, (req, res) => {
  res.render("pages/RegistrationPages/ConexSpeakerRegistration", {
    csrfToken: req.csrfToken(),
  });
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
    const conetFilter = {};
    const conexFilter = {};
    const speakerFilter = {};
    const adminFilter = {};
    const conet = await conetModel.find(conetFilter);
    const conex = await conexplusModel.find(conexFilter);
    console.log(conex);
    const speaker = await speakerModel.find(speakerFilter);
    const admin = await adminModel.find(adminFilter);
    res.render("pages/DashboardPages/Dashboard", {
      data1: conet,
      data2: conex,
      data3: speaker,
      data4: admin,
    });
  }
);

app.get(
  "/conet",
  passport.authenticate("jwt", {
    session: false,
  }),
  csrfProtection,
  async (req, res) => {
    res.render("pages/DashboardPages/Conet", {
      data1: conet,
      csrfToken: req.csrfToken(),
    });
  }
);

app.get(
  "/conexplus",
  csrfProtection,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/DashboardPages/ConexPlus", {
      csrfToken: req.csrfToken(),
    });
  }
);

app.get(
  "/conexspeaker",
  csrfProtection,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/DashboardPages/ConexSpeaker", {
      csrfToken: req.csrfToken(),
    });
  }
);

app.get(
  "/resetmypassword",
  passport.authenticate("jwt", {
    session: false,
  }),
  csrfProtection,
  (req, res) => {
    res.render("pages/DashboardPages/ResetPassword", {
      csrfToken: req.csrfToken(),
    });
  }
);

// Certificate
const privateKey = fs.readFileSync("./private.key", "utf8");
const certificate = fs.readFileSync("./certificate.crt", "utf8");
const ca = fs.readFileSync("./ca_bundle.crt", "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// const PORT = process.env.PORT || 3000;
httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
