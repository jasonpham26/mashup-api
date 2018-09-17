const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Artist = mongoose.model("artists");
const Event = mongoose.model("events");
const keys = require("../config/keys");
const request = require("request");
const { ensureAuthenticated } = require("../helpers/auth");


// Get ID for a specific artist
router.get("/:id", ensureAuthenticated, (req, res) => {
  Artist.findOne({
    _id: req.params.id
  }).then(artist => {
    const idOptions = {
      url: `http://api.eventful.com/json/performers/search?app_key=${
        keys.eventfulKey
      }&keywords=${artist.name}`,
      json: true
    };
    // Get artistID on eventful api
    request.get(idOptions, (err, res, body) => {
      const artistID = body.performers.performer.id;
      artist.artistID = artistID;
      artist.save().then(artist => {
        const eventOptions = {
          url: `http://api.eventful.com/json/performers/events/list?app_key=${
            keys.eventfulKey
          }&page_size=5&id=${artist.artistID}`,
          json: true
        };
        // Get upcoming events'ID
        request.get(eventOptions, (error, response, body) => {
          artist.events = [];
          for (var i = 0; i < body.event.length; i++) {
            // Store ID of events returned
            const newEvent = {
              title: body.event[i].title,
              city: body.event[i].city,
              country: body.event[i].country,
              date: body.event[i].start_time,
              eventID: body.event[i].id
            };
            artist.events.push(newEvent);
          }
          artist.save().then(artist => {
            console.log("Events added"); // for test only
          });
        });
      });
    });
    setTimeout(() => {
      res.redirect(`show/${req.params.id}`);
    }, 2000);
  });
});


// Add upcoming events for a specific artist
router.get("/show/:id", (req, res) => {
  Artist.findOne({ _id: req.params.id }).then(artist => {
    for (var i = 0; i < artist.events.length; i++) {
      const newEvent = {
        title: artist.events[i].title,
        date: artist.events[i].date,
        city: artist.events[i].city,
        country: artist.events[i].country,
        artist: artist,
        eventID: artist.events[i].eventID
      };

      Event.findOne({ eventID: artist.events[i].eventID }).then(event => {
        // Event already exists
        if (event) {
          // do nothing
          setTimeout(() => {}, 1000);
        } else {
          // add new event
          new Event(newEvent).save();
        }
      });
    }
  });
  Artist.findOne({ _id: req.params.id }).then(artist => {
    res.render("artists/show", {
      artist: artist
    });
  });
});

module.exports = router;
