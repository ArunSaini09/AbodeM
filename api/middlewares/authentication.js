<<<<<<< HEAD
//we have made a new folder entirely for authentication called middlewares
 
const bcrypt = require('bcryptjs')
const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

const {User} = require('../models/User');

//the users plain text pswrd is sent here, and we compare it with the passwordHash in the db
//bctypt handles the comparison byitself by hashing the user plain text and comparing it with the storedPasswordHash
function passwordsMatch(submittedPassword, storedPasswordHash){
    return bcrypt.compareSync(submittedPassword, storedPasswordHash);
}

//this code fires only when the user logins ... 
passport.use(

    //the passport middleware takes two inputs (obj, callback)
    //the obj has what the username and password fields should be 

    new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        //query user db to find if there is a user with the given email address
        User.findOne({where: {email}})
        .then((user) => {
            //check for null user
            if(!user) {
                console.log("\n\nFailed login: user does not exist\n\n");
                return done(null, false, {message: "Failed Login"});
            }
            //check for correct passwords
            if(passwordsMatch(password, user.passwordHash) === false) {
                console.log("password does not match whats in file");
                return done(null, false, {message: "Failed Login"});
            }

            console.log("Successful Login");
            return done(null, user, {message: "success login"});
        })
        //this err is for db problems like it doesnt exist, etc. 
        .catch((err) => {
            return done(err);
        })
    })
);

//serializeUser determines which info about the user should be stored in the session cookie

passport.serializeUser((user, done) => {
    done(null, user.id);
})






module.exports = passport;
=======
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");

function passwordsMatch(submittedPassword, storedPasswordHash) {
  return bcrypt.compareSync(submittedPassword, storedPasswordHash);
}

/*
  The following code runs at login time.
  The usernameField and passwordField options refer to the HTTP requests
  body parameter names. I've set this to look for an `email` parameter,
  but you may prefer to use a `username` parameter instead of an email.
  BEST PRACTICE: don't state why login failed to the user.
*/

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            console.log("\n\nFailed Login: user does not exist\n\n");
            // null = err code, false = no user object
            return done(null, false, { message: "Failed Login: user does not exist" });
          }

          if (passwordsMatch(password, user.passwordHash) === false) {
            console.log("\n\nFailed Login: passwords did not match\n\n");
            return done(null, false, { message: "Failed Login: passwords did not match" });
          }

          console.log("\n\nSuccessful Login\n\n");
          return done(null, user, { message: "Successfully Logged In!" });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.dataValues.user_id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
      return;
    })
    .catch((err) => done(err, null));
});

passport.isAuthenticated = () => (req, res, next) =>
  req.user ? next() : res.sendStatus(401);

  
module.exports = passport;
>>>>>>> deaf891ffdd64ab51a55af37009df52ae4d119fc
