const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const passport = require("passport");
// Load User model
require("./models/User");

// Load keys
require("./config/keys");
// Load passport config
require("./config/passport")(passport);
// MIDDLEWARES

// ROUTES
// load routes
const auth = require("./routes/auth");

// Initial app
const app = express();
// Use routes
app.use("/auth", auth);

// Port number
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
