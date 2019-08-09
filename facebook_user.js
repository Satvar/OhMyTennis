const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/users');



// passport.use(new FacebookStrategy({
//     //Information stored on config/auth.js
//     clientID: "2453107574735287",
//     clientSecret: "03ca7e905b340cad767f697704eab161",
//     callbackURL: "http://localhost:3000/OhMyTennis/auth/facebook/callback",
//    // profileFields: ['id', 'emails', 'displayName', 'name', 'gender'] 

// }, function (accessToken, refreshToken, profile, done) {
//     //Using next tick to take advantage of async properties

//     console.log(profile);

})); 

module.exports = passport;