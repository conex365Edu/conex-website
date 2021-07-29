// @type    GET
// @route   /AdminDashboard
// @desc    Admin Dashboard Page
// @access  PUBLIC
app.get(
  '/AdminDashboard',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const conetFilter = {}
    const conexFilter = {}
    const speakerFilter = {}
    const adminFilter = {}
    const conet = await conetModel.find(conetFilter)
    const conex = await conexplusModel.find(conexFilter)
    console.log(conex)
    const speaker = await speakerModel.find(speakerFilter)
    const admin = await adminModel.find(adminFilter)
    res.render('pages/DashboardPages/Dashboard', {
      data1: conet,
      data2: conex,
      data3: speaker,
      data4: admin
    })
  }
)

// @type    GET
// @route   /conet
// @desc    Conet Dashboard Page
// @access  PRIVATE
app.get(
  '/conet',
  passport.authenticate('jwt', {
    session: false
  }),
  csrfProtection,
  async (req, res) => {
    res.render('pages/DashboardPages/Conet', {
      data1: conet,
      csrfToken: req.csrfToken()
    })
  }
)

// @type    GET
// @route   /conexplus
// @desc    Conexplus Dashboard Page
// @access  PRIVATE
app.get(
  '/conexplus',
  csrfProtection,
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    res.render('pages/DashboardPages/ConexPlus', {
      csrfToken: req.csrfToken()
    })
  }
)

// @type    GET
// @route   /conexspeaker
// @desc    Conexspeaker Dashboard Page
// @access  PRIVATE
app.get(
  '/conexspeaker',
  csrfProtection,
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    res.render('pages/DashboardPages/ConexSpeaker', {
      csrfToken: req.csrfToken()
    })
  }
)

// @type    GET
// @route   /conexspeaker
// @desc    Conexspeaker Dashboard Page
// @access  PRIVATE
app.get(
  '/incurDash',
  csrfProtection,
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    res.render('pages/DashboardPages/IncurMarketing', {
      csrfToken: req.csrfToken()
    })
  }
)

// @type    GET
// @route   /subscription
// @desc    Subscription Page
// @access  PRIVATE
// app.get(
//   "/subscription",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   (req, res) => {
//     res.render("pages/DashboardPages/Subscriptions");
//   }
// );

// @type    GET
// @route   /resetmypassword
// @desc    Resetmypassword Dashboard Page
// @access  PRIVATE
app.get(
  '/resetmypassword',
  passport.authenticate('jwt', {
    session: false
  }),
  csrfProtection,
  (req, res) => {
    res.render('pages/DashboardPages/ResetPassword', {
      csrfToken: req.csrfToken()
    })
  }
)

// skill card
