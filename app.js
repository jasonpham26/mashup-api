const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const passport = require("passport");
// Load User model
require("./models/User");

// Load keys
const keys = require("./config/keys");
// Load passport config
require("./config/passport")(passport);
// Map global promise to avoid warning
mongoose.Promise = global.Promise;
// Mongoose connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Initial app
const app = express();
// MIDDLEWARES
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
// load routes
const auth = require("./routes/auth");

// Use routes
app.use("/auth", auth);

// Port number
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
