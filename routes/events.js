const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Artist = mongoose.model("artists");
const keys = require("../config/keys");
const request = require("request");
const { ensureAuthenticated } = require("../helpers/auth");

router.get("events/:id", ensureAuthenticated, (req, res) => {
  const eventDetailOptions = {
    url: `http://api.eventful.com/rest/events/get?app_key=${
      keys.eventfulKey
    }&id=${req.params.id}`,
    json: true
  };
  let cordinate = {
    lat: 0,
    long: 0
  };
  request.get(eventDetailOptions, (err, res, body) => {
    newCordinate = {
      lat: body.lattitude,
      long: body.longtitude
    };
  });
});
module.exports = router;
