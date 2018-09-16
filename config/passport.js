const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");
const request = require("request");
// Load User Schema
const User = mongoose.model("users");
const Artist = mongoose.model("artists");
module.exports = function(passport) {
  passport.use(
    new SpotifyStrategy(
      {
        clientID: keys.spotifyClientID,
        clientSecret: keys.spotifyClientSecret,
        callbackURL: "/auth/spotify/callback",
        proxy: true
      },
      (accessToken, refreshToken, expires_in, profile, done) => {
        var token = accessToken;
        const newUser = {
          // Unique spotifyID
          spotifyID: profile.id,
          // Email
          email: profile._json.email,
          // User display name
          name: profile.displayName,
          // Profile image
          image: profile._json.images.url,
          accessToken: token
        };
        //Check if user is already exist
        User.findOne({
          spotifyID: profile.id
        }).then(user => {
          // If user exists
          if (user) {
            user.accessToken = token;
            user.save().then(user => {
              done(null, user);
            });
          } else {
            // Create a new user
            new User(newUser).save().then(user => {
              done(null, user);
            });
          }
        });
      }
    )
  ); // passport.use() ends here

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
};
