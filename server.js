const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const volleyball = require("volleyball");
const path = require("path");
const app = express();

//Jwt Configuration
const cookieParser = require("cookie-parser");
const passport = require("passport");

//SSl Configuration
const forceSSL = require("express-force-ssl");
const http = require("http");
const https = require("https");
const fs = require("fs");

//Security Configuration
const helmet = require("helmet");

//MongoDB Config Path
const db = require("./connection/config");

//Sub Routes
const admin = require("./routes/api/adminLogin");
const conet = require("./routes/api/conet");
const conexplus = require("./routes/api/conexplus");
const conexspeaker = require("./routes/api/conexspeaker");
const monthlyPayment = require("./routes/api/monthPay");

//Forum Routes
const forumLogin = require("./routes/api/Forum/Login.Services");

//Incurex Routes
const IncurexLogin = require("./routes/api/Incur/Incur.registration");

//Skill Card Routes
const skillCard = require("./routes/api/SkillCard");

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

//BodyParser Middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Passport Authentication
app.use(passport.initialize());

require("./strategy/jwtStrategy")(passport);

//Security Middleware
// app.use(helmet())
// app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

//Middleware for cookieparser
app.use(cookieParser());

//Middleware for volleyball
app.use(volleyball);

//Actual Routes
app.use("/api/auth", admin);
app.use("/api/registration", conet);
app.use("/api/registration", conexplus);
app.use("/api/registration", conexspeaker);
app.use("/api/analytics", skillCard);
app.use("/api/payment365/", monthlyPayment);

//Form Main Routes
app.use("/api/forum/services", forumLogin);

app.use("/content/incur/services", IncurexLogin);

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

// @type    GET
// @route   /
// @desc    Index Page
// @access  PUBLIC
app.get("/", (req, res) => {
  res.render("pages/index");
});

// @type    GET
// @route   /workshop
// @desc    Workshop Page
// @access  PUBLIC
app.get("/workshop", (req, res) => {
  res.render("pages/workshop");
});

// @type    GET
// @route   /trainings
// @desc    Trainings Page
// @access  PUBLIC
app.get("/trainings", (req, res) => {
  res.render("pages/Trainings");
});

// @type    GET
// @route   /virtual
// @desc    Virtual Page
// @access  PUBLIC
app.get("/virtual", (req, res) => {
  res.render("pages/Virtual");
});

// @type    GET
// @route   /onSite
// @desc    onSite Page
// @access  PUBLIC
app.get("/onSite", (req, res) => {
  res.render("pages/Onsite");
});

// @type    GET
// @route   /conextoc
// @desc    Conextoc Page
// @access  PUBLIC
app.get("/conextoc", (req, res) => {
  res.render("pages/Conextoc");
});

// @type    GET
// @route   /conextoi
// @desc    Conextoi Page
// @access  PUBLIC
app.get("/conextoi", (req, res) => {
  res.render("pages/Conextoi");
});

// @type    GET
// @route   /conetregistration
// @desc    Conet Registration Page
// @access  PUBLIC
app.get("/conetregistration", csrfProtection, (req, res) => {
  res.render("pages/RegistrationPages/ConetRegistration", {
    csrfToken: req.csrfToken(),
  });
});

// @type    GET
// @route   /conexplusregistration
// @desc    Conexplus Registration Page
// @access  PUBLIC
app.get("/conexplusregistration", csrfProtection, (req, res) => {
  res.render("pages/RegistrationPages/ConexPlusRegistration", {
    csrfToken: req.csrfToken(),
  });
});

// @type    GET
// @route   /conexion
// @desc    Conexion Page
// @access  PUBLIC
app.get("/conexion", (req, res) => {
  res.render("pages/conexion");
});

// @type    GET
// @route   /about
// @desc    About Page
// @access  PUBLIC
app.get("/about", (req, res) => {
  res.render("pages/about");
});

// @type    GET
// @route   /csr
// @desc    Csr Page
// @access  PUBLIC
app.get("/csr", (req, res) => {
  res.render("pages/Csr");
});

// @type    GET
// @route   /speaker
// @desc    Speaker Page
// @access  PUBLIC
app.get("/speaker", (req, res) => {
  res.render("pages/speaker");
});

// @type    GET
// @route   /team
// @desc    Team Page
// @access  PUBLIC
app.get("/team", (req, res) => {
  res.render("pages/Team");
});

// @type    GET
// @route   /subscribe
// @desc    Subscripton Page
// @access  PUBLIC
app.get("/subscribe", csrfProtection, (req, res) => {
  res.render("pages/subscribe", {
    csrfToken: req.csrfToken(),
  });
});

// @type    GET
// @route   /subscribe
// @desc    Subscripton Page
// @access  PUBLIC
app.get("/Thankusu", (req, res) => {
  res.render("pages/Thankusu");
});

// @type    GET
// @route   /privacy
// @desc    Privacy Page
// @access  PUBLIC
app.get("/privacy", (req, res) => {
  res.render("pages/privacy");
});

// @type    GET
// @route   /contact
// @desc    Contact Page
// @access  PUBLIC
app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

// @type    GET
// @route   /termsofservice
// @desc    Terms Of Service Page
// @access  PUBLIC
app.get("/TofS", (req, res) => {
  res.render("pages/TofS");
});

// @type    GET
// @route   /carfp
// @desc    Carfp
// @access  PUBLIC
app.get("/carfp", (req, res) => {
  res.render("pages/carfp");
});

// @type    GET
// @route   /ThankYou
// @desc    Thank You Page
// @access  PUBLIC
app.get("/ThankYou", (req, res) => {
  res.render("pages/ThankYou");
});

// @type    GET
// @route   /Certification/MachineLearning
// @desc    Machine Learning Page
// @access  PUBLIC
app.get("/Certification/MachineLearning", (req, res) => {
  res.render("pages/Certifications/MachineLearning");
});

// @type    GET
// @route   /Certification/Python
// @desc    Python Page
// @access  PUBLIC
app.get("/Certification/Python", (req, res) => {
  res.render("pages/Certifications/Python");
});

// @type    GET
// @route   /Certification/DataScience
// @desc    Data Science Page
// @access  PUBLIC
app.get("/Certification/DataScience", (req, res) => {
  res.render("pages/Certifications/DataScience");
});

// @type    GET
// @route   /Certification/BigData
// @desc    Big Data Page
// @access  PUBLIC
app.get("/Certification/BigData", (req, res) => {
  res.render("pages/Certifications/BigData");
});

// @type    GET
// @route   /Certification/Android
// @desc    Android Page
// @access  PUBLIC
app.get("/Certification/Android", (req, res) => {
  res.render("pages/Certifications/Android");
});

// @type    GET
// @route   /Certification/FullStack
// @desc    Full Stack Page
// @access  PUBLIC
app.get("/Certification/FullStack", (req, res) => {
  res.render("pages/Certifications/FullStack");
});

// @type    GET
// @route   /Certification/AWS
// @desc    AWS Page
// @access  PUBLIC
app.get("/Certification/AWS", (req, res) => {
  res.render("pages/Certifications/AWS");
});

// @type    GET
// @route   /Certification/CandCPP
// @desc    CandCPP Page
// @access  PUBLIC
app.get("/Certification/CandCPP", (req, res) => {
  res.render("pages/Certifications/CandCPP");
});

// @type    GET
// @route   /Certification/Java
// @desc    Java Page
// @access  PUBLIC
app.get("/Certification/Java", (req, res) => {
  res.render("pages/Certifications/Java");
});

// @type    GET
// @route   /Certification/DSandAlgorithm
// @desc    DS and Algorithm Page
// @access  PUBLIC
app.get("/Certification/DSandAlgorithm", (req, res) => {
  res.render("pages/Certifications/DSandAlgorithm");
});

// @type    GET
// @route   /Certification/CyberSecurity
// @desc    Cyber Security Page
// @access  PUBLIC
app.get("/Certification/CyberSecurity", (req, res) => {
  res.render("pages/Certifications/CyberSecurity");
});

// @type    GET
// @route   /Certification/BI
// @desc    Cyber Security Page
// @access  PUBLIC
app.get("/Certification/BI", (req, res) => {
  res.render("pages/Certifications/BI");
});

// @type    GET
// @route   /Certification/BI
// @desc    Cyber Security Page
// @access  PUBLIC
app.get("/Certification/PowerBI", (req, res) => {
  res.render("pages/Certifications/PowerBI");
});

// @type    GET
// @route   /Certification/BI
// @desc    Cyber Security Page
// @access  PUBLIC
app.get("/Certification/MSpowerBI", (req, res) => {
  res.render("pages/Certifications/MSpowerBI");
});

// @type    GET
// @route   /ThankYou
// @desc    Thank You Page
// @access  PUBLIC
app.get("/PayError", (req, res) => {
  res.render("pages/PayError");
});

// @type    GET
// @route   /workshopdetails
// @desc    Workshop Details Page
// @access  PUBLIC
app.get("/workshopdetails", (req, res) => {
  res.render("pages/workshopDetails");
});

// @type    GET
// @route   /conexspeakerregistration
// @desc    Conex Speaker Registration Page
// @access  PUBLIC
app.get("/conexspeakerregistration", csrfProtection, (req, res) => {
  res.render("pages/RegistrationPages/ConexSpeakerRegistration", {
    csrfToken: req.csrfToken(),
  });
});

// @type    GET
// @route   /incur
// @desc    Incur Home
// @access  PUBLIC
app.get("/incur", (req, res) => {
  res.render("incur/index");
});

// @type    GET
// @route   /AdminLogin
// @desc    Admin Login
// @access  PRIVATE
app.get("/AdminLogin", csrfProtection, (req, res) => {
  res.render("pages/adminLogin", { csrfToken: req.csrfToken() });
});

// @type    GET
// @route   /AdminDashboard
// @desc    Admin Dashboard Page
// @access  PUBLIC
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

// @type    GET
// @route   /conet
// @desc    Conet Dashboard Page
// @access  PRIVATE
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

// @type    GET
// @route   /conexplus
// @desc    Conexplus Dashboard Page
// @access  PRIVATE
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

// @type    GET
// @route   /conexspeaker
// @desc    Conexspeaker Dashboard Page
// @access  PRIVATE
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

// @type    GET
// @route   /conexspeaker
// @desc    Conexspeaker Dashboard Page
// @access  PRIVATE
app.get(
  "/incurDash",
  csrfProtection,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/DashboardPages/IncurMarketing", {
      csrfToken: req.csrfToken(),
    });
  }
);

// @type    GET
// @route   /subscription
// @desc    Subscription Page
// @access  PRIVATE
app.get(
  "/subscription",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.render("pages/DashboardPages/Subscriptions");
  }
);

// @type    GET
// @route   /resetmypassword
// @desc    Resetmypassword Dashboard Page
// @access  PRIVATE
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

// Zero SSl Provided Certificate Config
if (process.env.NODE_ENV == "production") {
  //Force SSL is configured for https...Don't Remove
  app.use(forceSSL);
  const privateKey = fs.readFileSync("./certificates/private.key", "utf8");
  const certificate = fs.readFileSync("./certificates/certificate.crt", "utf8");
  const ca = fs.readFileSync("./certificates/ca_bundle.crt", "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  // Starting both http & https servers
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(80, () => {
    console.log("HTTP Server running on port 80");
  });

  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
} else {
  app.listen(5000, () => {
    console.log(`Server is running at http://localhost:5000`);
  });
}
