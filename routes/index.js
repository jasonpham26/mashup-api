const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");
const axios = require("axios");
router.get("/", (req, res) => {
  res.render("index/welcome");
});

router.get("/dashboard", (req, res) => {
  // console.log(req.user.accessToken);
  // const spotifyUrl = `https://api.spotify.com/v1/me/top/artists" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${
  //   req.user.accessToken
  // }`;
  // axios
  //   .get(spotifyUrl)
  //   .then(res => {
  //     if (response.data.status === "ZERO_RESULTS") {
  //       throw new Error("Unable to find the address");
  //     }
  //     console.log(res);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // res.send("You are logged in, this is your username -" + req.user);
});
module.exports = router;
