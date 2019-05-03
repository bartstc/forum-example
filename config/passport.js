// Passport - library used for protecting private routes, it check if user is logged before server response
const JwtStrategy = require('passport-jwt').Strategy; // verify user by JWT
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('./keys');

// setup options for JWT Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // tell our strategy where it can find the key (jwt), in this case from header request, when request comes in, and we want passport to handle it, it needs to look at request header
opts.secretOrKey = keys.secretOrKey; // secret that passport needs to use to decode our JWT

module.exports = passport => {
  passport.use( // tell passport to use JWTStrategy
    new JwtStrategy(opts, (jwt_payload, done) => { // jwt_payload - decoded info about user (comes from login post), done - callback func which we need to call when successfuly or not authenticate the user
      User.findById(jwt_payload.id) // if user id exist in database, call 'done' with that user, otherwise call 'done' without an user object
        .then(user => {
          if (user) { // if user with id (in payload) exist in database...
            return done(null, user); // parameters: first - err object, second - user object
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
