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
        // console.log(profile);
        console.log(profile._json);
        console.log(profile._json.images[0].url);
        // console.log(`Code: ${accessToken}`);
        // const image = profile.photos[0];
        // console.log(`image: ${image}`);
        const newUser = {
          // Unique spotifyID
          spotifyID: profile.id,
          // Email
          email: profile._json.email,
          // User display name
          name: profile.displayName,
          // Profile image
          image: profile._json.images.url
        };
      }
    )
  );
};
