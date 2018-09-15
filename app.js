const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
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
// MIDDLEWARES ---------------------------------------
// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Cookie parser
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// ---------------------------------------------------
// GLOBAL VARIABELS
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// PUBLIC FOLDER SETUP (folder to store css files)
app.use(express.static(path.join(__dirname, "public")));
// ROUTES --------------------------------------------
// load routes
const auth = require("./routes/auth");
const spotify = require("./routes/spotify");
const index = require("./routes/index");

// ---------------------------------------------------
// Use routes
app.use("/", index);
app.use("/auth", auth);
app.use("/spotify", auth);

// Port number
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
