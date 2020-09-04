const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const user = mongoose.model('users');

passport.serializeUser((User, done) => {
  done(null, User.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id).then((User) => {
    done(null, User);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      user.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //user already exists
          done(null, existingUser);
        } else {
          //user does not exist, create new record
          new user({ googleId: profile.id })
            .save()
            .then((User) => done(null, User));
        }
      });
    }
  )
);
