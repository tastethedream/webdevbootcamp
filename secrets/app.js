//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require ("mongoose-findorcreate");



//const bcrypt = require("bcrypt");
//const saltRounds = 10;


const app = express();
//const encrypt = require("mongoose-encryption");


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: "our little secret",
    resave : false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

// fix for mongoose depracation warning
mongoose.set("useCreateIndex", true);

//set up the schema to allow mongoose-encryption

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//define secret string

//userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields:["password"]});

//mongoose model

const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/secret",
    //userProfileURL: "https://googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));




//render home,login and register page

app.get("/", function(req, res){
    res.render("home");
});
// get route for authentication

app.get("/auth/google", 
    passport.authenticate ("google", { scope: ["profile"] })
);

app.get("/auth/google/secret", 
  passport.authenticate("google", { failureRedirect: "/login"}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  });

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/secrets", function(req, res){
// search db for all secrets
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
        if (err){
            console.log (err);
        } else {
            if (foundUsers){
                res.render("secrets", {usersWithSecrets: foundUsers});
            }
        }
    });
});
// get route for submit secret

app.get("/submit", function(req, res){
    if (req.isAuthenticated()){
        res.render("submit");
    } else {
        res.redirect("login");
    }
});
 //post route for submit secret

 app.post("/submit", function(req, res){
     const submittedSecret = req.body.secret;
        console.log(req.user.id);

        User.findById(req.user.id, function(err, foundUser){
            if (err){
                console.log(err);

            } else {
                if (foundUser){
                    foundUser.secret = submittedSecret;
                    foundUser.save(function (){
                        res.redirect("/secrets");
                    });
                }
            }
        });
 });




app.get("/logout", function(req, res){
    //deauthenticate the user on logout route end session
    req.logout();
    res.redirect("/");
});

//register postroute

app.post("/register", function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local") (req, res, function(){
                res.redirect("/secrets");
            }); 
        }
    });

});

//login post route

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if (err){
        console.log(err);
        res.redirect("/register");
    } else {
        passport.authenticate("local") (req, res, function(){
            res.redirect("/secrets");
        });
      }
    });
});


app.listen(8080, function(){
  console.log("Server started on port 8080.");
});




//bcrypt code app.post
// bcrypt.hash(req.body.password, saltRounds, function(err, hash){
//     // create the user
//         const newUser = new User({
//             email: req.body.username,
//             password: hash
//         });
//         newUser.save(function(err){
//             if (err){
//                 console.log(err);
//              } else {
//             res.render("secrets");
//               }
//             });
//         });

//         const username = req.body.username;
//     const password = req.body.password;

//     User.findOne({email: username}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         } else {
//             if(foundUser){
//                 bcrypt.compare(password, foundUser.password, function(err, result){
//                     if (result === true){
//                         res.render("secrets");
//                 }
//             });
//         }
//       }  
//     });