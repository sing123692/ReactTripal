const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = "868304532839-bm1vs4orclqnst1ahvg0mrqq9rm6s2sb.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
var mysqlConn = require('./config');



passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
},
  function (accessToken, refreshToken, profile, done) {
    done(null, profile)

  }
));


passport.serializeUser((user, done) => {
  return done(null, user)
})
passport.deserializeUser((user, done) => {
  return done(null, user)
})