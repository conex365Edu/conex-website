# Conex365

Conex365 was a high quality skill development platform to have gained an IPR which is focused on skilling up people from different nations, communities and race.

> **The company was shut down and is not running now.**


Accessing [admin](https://conex365.herokuapp.com/admin) pages

### For running in system

```console
npm install
```

```console
npm start
```

### Folder Structure

```console
.
├── config
│   └── config.js
├── controls
│   ├── adminControl.js
│   ├── authControl.js
│   ├── incurControl.js
│   └── registrationControl.js
├── LICENSE
├── middleware
│   ├── authMiddleware.js
│   └── validationMiddleware.js
├── models
│   ├── adminModel.js
│   ├── conetModel.js
│   ├── conexPlusModel.js
│   └── speakerModel.js
├── package.json
├── package-lock.json
├── Procfile
├── public
│   ├── css
│   │   ├── bootstrap.min.css
│   │   ├── carousel.css
│   │   ├── font-awesome.min.css
│   │   ├── incur.css
│   │   ├── registerStyle.css
│   │   └── style.css
│   ├── fonts
│   │   ├── fa-brands-400.eot
│   │   ├── fa-brands-400.svg
│   │   ├── fa-brands-400.ttf
│   │   ├── fa-brands-400.woff
│   │   ├── fa-brands-400.woff2
│   │   ├── fa-regular-400.eot
│   │   ├── fa-regular-400.svg
│   │   ├── fa-regular-400.ttf
│   │   ├── fa-regular-400.woff
│   │   ├── fa-regular-400.woff2
│   │   ├── fa-solid-900.eot
│   │   ├── fa-solid-900.svg
│   │   ├── fa-solid-900.ttf
│   │   ├── fa-solid-900.woff
│   │   ├── fa-solid-900.woff2
│   │   ├── FontAwesome.otf
│   │   ├── fontawesome-webfont.eot
│   │   ├── fontawesome-webfont.svg
│   │   ├── fontawesome-webfont.ttf
│   │   ├── fontawesome-webfont.woff
│   │   └── fontawesome-webfont.woff2
│   ├── img
│   │   ├── about
│   │   │   ├── abcdef.png
│   │   │   ├── abcde.png
│   │   │   ├── abcd.png
│   │   │   ├── abc.png
│   │   │   └── aboutus.svg
│   │   ├── clients
│   │   │   ├── client-10.png
│   │   │   ├── client-11.png
│   │   │   ├── client-12.png
│   │   │   ├── client-13.png
│   │   │   ├── client-14.png
│   │   │   ├── client-15.png
│   │   │   ├── client-1.png
│   │   │   ├── client-2.png
│   │   │   ├── client-3.png
│   │   │   ├── client-4.png
│   │   │   ├── client-5.png
│   │   │   ├── client-6.png
│   │   │   ├── client-7.png
│   │   │   ├── client-8.png
│   │   │   └── client-9.png
│   │   ├── conex365.jpg
│   │   ├── conexion
│   │   │   ├── bitcoin.svg
│   │   │   └── health.svg
│   │   ├── edu_ilastration.png
│   │   ├── home
│   │   │   ├── about.svg
│   │   │   ├── dhanam.png
│   │   │   ├── home.svg
│   │   │   ├── Mathrubhumi_Feature.jpg
│   │   │   ├── mathru.png
│   │   │   └── startup_india_thumbnail.png
│   │   ├── incur
│   │   │   ├── 30_day.svg
│   │   │   ├── about_incur.jpg
│   │   │   ├── assessment.svg
│   │   │   ├── InCur logo White.png
│   │   │   ├── interview.svg
│   │   │   ├── job.svg
│   │   │   ├── live_task.svg
│   │   │   ├── logo.png
│   │   │   ├── Marketing
│   │   │   │   ├── benefits.png
│   │   │   │   ├── coursebg.jpg
│   │   │   │   ├── incurCertificate.png
│   │   │   │   ├── market.jpg
│   │   │   │   ├── organization.png
│   │   │   │   └── takeaways.png
│   │   │   ├── syllabus.svg
│   │   │   └── why.png
│   │   ├── logo2.jpg
│   │   ├── Logofinalcolor.png
│   │   ├── logowhite.png
│   │   ├── sample.png
│   │   ├── sample.svg
│   │   └── speaker.svg
│   └── js
│       ├── bootstrap.min.js
│       ├── carousel.js
│       ├── main.js
│       ├── mobile-nav.js
│       ├── plugins.js
│       └── vendor
│           ├── jquery-1.12.4.min.js
│           ├── jquery.min.js
│           └── modernizr-3.5.0.min.js
├── README.md
├── routes
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── incurRoutes.js
│   ├── publicRoutes.js
│   └── registrationRoutes.js
├── server.js
└── views
    ├── dashboardPages
    │   ├── conet.ejs
    │   ├── conexPlus.ejs
    │   ├── conexSpeaker.ejs
    │   ├── dashboard.ejs
    │   └── partials
    │       └── adminNavbar.ejs
    ├── incur
    │   ├── contact.ejs
    │   ├── index.ejs
    │   ├── marketing.ejs
    │   └── partials
    │       ├── incurFooter.ejs
    │       ├── incurHead.ejs
    │       ├── incurHeader.ejs
    │       └── incurScript.ejs
    ├── pages
    │   ├── 404.ejs
    │   ├── about.ejs
    │   ├── adminLogin.ejs
    │   ├── carfp.ejs
    │   ├── conetRegistration.ejs
    │   ├── conexion.ejs
    │   ├── conexPlusRegistration.ejs
    │   ├── conexSpeakerRegistration.ejs
    │   ├── conexToC.ejs
    │   ├── conexToI.ejs
    │   ├── contact.ejs
    │   ├── Csr.ejs
    │   ├── index.ejs
    │   ├── onSite.ejs
    │   ├── privacy.ejs
    │   ├── speaker.ejs
    │   ├── Team.ejs
    │   ├── TofS.ejs
    │   ├── virtual.ejs
    │   └── workshop.ejs
    └── partials
        ├── head.ejs
        ├── mainFooter.ejs
        ├── mainNavbar.ejs
        └── mainScripts.ejs

```
