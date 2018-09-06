// This model is used to create User collection in the mongodb.
// User will be asked to login using Spotify account when they try
// to use the services on the web app.
// Details returned from Spotify API will be saved in the database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  spotifyID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  image: {
    type: String
  }
});

// Create schema and collection
mongoose.model("users", UserSchema);
