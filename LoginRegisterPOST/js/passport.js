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

    if (!profile.emails || !profile.emails.length) {
      return done(new Error('No email associated with this account'));
    }

    const email = profile.emails[0].value;

    const queryString = 'SELECT * FROM tb_user WHERE id = ?';
    const queryValues = [email ];

    mysqlConn.query(queryString, queryValues, async (error, results) => {
      if(error){
        done(error, null);
      }else if (results.length > 0){
        done(null, results[0]);
      }else{
        const insertQuery = 'INSERT INTO tb_user (id) VALUES (?)';
        const insertValues = [email];
        
        try{
          await mysqlConn.query(insertQuery, insertValues);
          const newUser = {id : email};
          done(null, newUser);
        }catch (err){
          console.error(err);
          done(err, null);
        }
      }
    })

  }
));


passport.serializeUser((user, done) => {
  return done(null, user)
})
passport.deserializeUser((user, done) => {
  return done(null, user)
})