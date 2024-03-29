// This model is used to create User collection in the mongodb.
// User will be asked to login using Spotify account when they try
// to use the services on the web app.
// Details returned from Spotify API will be saved in the database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  events: [
    {
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
      eventID: {
        type: String
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  artistID: {
    type: String
  }
});

// Create schema and collection
mongoose.model("artists", ArtistSchema, "artists");
