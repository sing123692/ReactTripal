const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = "868304532839-bm1vs4orclqnst1ahvg0mrqq9rm6s2sb.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });放資料庫的
    done(null, profile)
  }
));


passport.serializeUser((user,done)=>{
    done(null, user)
});

passport.deserializeUser((user,done)=>{
    done(null, user)
});