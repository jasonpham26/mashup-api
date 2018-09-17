const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Artist = mongoose.model("artists");
const Event = mongoose.model("events");
const keys = require("../config/keys");
const request = require("request");
const { ensureAuthenticated } = require("../helpers/auth");


// Get detail about an event given an ID
router.get("/:id", ensureAuthenticated, (req, res) => {
  const id = req.params.id;
  const eventDetailOptions = {
    url: `http://api.eventful.com/json/events/get?app_key=${
      keys.eventfulKey
    }&id=${id}`,
    json: true
  };
  request.get(eventDetailOptions, (err, response, body) => {
    // Add venue and cordinate of the event
    Event.findOne({ eventID: req.params.id }).then(event => {
      event.venue = body.venue_name;
      event.latitude = body.latitude;
      event.longitude = body.longitude;
      event.save().then(event => {
        // Render show page
        res.render("events/show", {
          event: event
        });
      });
    });
  });
});
module.exports = router;
