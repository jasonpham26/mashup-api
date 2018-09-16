const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Artist = mongoose.model("artists");
const request = require("request");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("index/welcome");
});

router.get("/getArtists", ensureAuthenticated, (req, res) => {
  User.findOne({ _id: req.user.id }).then(user => {
    const token = user.accessToken;
    // Get user top listen artists
    var topArtistsOption = {
      url: "https://api.spotify.com/v1/me/top/artists?limit=5",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      },
      json: true
    };
    request.get(topArtistsOption, (err, res, body) => {
      for (var i = 0; i < body.items.length; i++) {
        let newArtist = {
          name: body.items[i].name,
          image: body.items[i].images[2].url,
          events: [],
          user: req.user.id
        };
        Artist.findOne({ name: body.items[i].name }).then(artist => {
          // If artist is not already exists
          if (artist) {
            console.log("Passed");
          } else {
            // Create new artist
            new Artist(newArtist).save();
          }
        });
      }
    });
    // Wait for the loop to finish
    setTimeout(() => {
      res.redirect("/dashboard");
    }, 2800);
  });
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // Find list of artists saved in database and then display on user dashboard
  Artist.find({ user: req.user.id }).then(artists => {
    res.render("index/dashboard", {
      artists: artists
    });
  });
});

module.exports = router;

router.get("/about", (req, res) => {
  res.render("/index/about");
});

module.exports = router;
