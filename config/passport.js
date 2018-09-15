const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");
const axios = require("axios");
const request = require("request");
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
        // console.log(profile);
        const token = "Bearer" + accessToken;
        // const spotifyUrl = `https://api.spotify.com/v1/me/top/artists?limit=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}`;
        const spotifyUrl =
          "https://api.spotify.com/v1/me/top/artists?limit=5&offset=5";

        var options = {
          url: "https://api.spotify.com/v1/me/top/artists?limit=5",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken
          },
          json: true
        };

        request.get(options, (err, res, body) => {
          console.log(body);
          console.log(body.items[0].images);
        });

        // axios
        //   .get(spotifyUrl, {
        //     headers: {
        //       Authorization: token
        //     }
        //   })
        //   .then(res => {
        //     if (response.data.status === "ZERO_RESULTS") {
        //       throw new Error("Unable to find the address");
        //     }
        //     console.log(res);
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });

        const newUser = {
          // Unique spotifyID
          spotifyID: profile.id,
          // Email
          email: profile._json.email,
          // User display name
          name: profile.displayName,
          // Profile image
          image: profile._json.images.url,
          // accessToken
          accessToken: token
        };

        // Check if user is already exist
        // User.findOne({
        //   spotifyID: profile.id
        // }).then(user => {
        //   // If user exists
        //   if (user) {
        //     if (user.accessToken !== token) {
        //       user.accessToken = token;
        //       user.save().then(() => {
        //         console.log("accessToken updated!");
        //         done(null, user);
        //       });
        //     }
        //     // since accesToken will be updated everytime we
        //     // make a request, it is neccesary to update accessToken everytime
        //   } else {
        //     // Create a new user
        //     new User(newUser).save().then(user => {
        //       done(null, user);
        //     });
        //   }
        // });
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
