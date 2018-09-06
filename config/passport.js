const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");
// Load User Schema
const User = mongoose.model("users");
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
        // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        //   return done(err, user);
        // });
        console.log(profile);
        console.log(`Code: ${accessToken}`);
      }
    )
  );
};
