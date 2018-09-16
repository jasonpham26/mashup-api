// This model is used to create User collection in the mongodb.
// User will be asked to login using Spotify account when they try
// to use the services on the web app.
// Details returned from Spotify API will be saved in the database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists"
  },
  eventID: {
    type: String
  }
});

// Create schema and collection
mongoose.model("events", EventSchema, "events");
