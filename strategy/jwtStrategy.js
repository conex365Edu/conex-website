const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Admin = require("../models/Admin");
const key = require("../connection/config");
const passport = require("passport");

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies["_q3e8bkdl3"];
  return token;
};

var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Bearer");
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = key.tokenSecret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Admin.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
