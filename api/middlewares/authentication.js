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