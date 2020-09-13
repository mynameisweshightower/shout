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
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await user.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const User = await new user({ googleId: profile.id }).save();
      done(null, User);
    }
  )
);
