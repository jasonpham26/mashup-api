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
require("./models/Artist");
require("./models/Event");

// Load keys
const keys = require("./config/keys");
// Load passport config
require("./config/passport")(passport);
// Handlebar helper
const { initMap } = require("./helpers/hbs");
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

mongoose.set("useCreateIndex", true);

// Initial app
const app = express();
// MIDDLEWARES ---------------------------------------
// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      initMap: initMap
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// express session middleware
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
  })
);
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
const index = require("./routes/index");
const artist = require("./routes/artist");
const event = require("./routes/event");

// ---------------------------------------------------
// Use routes
app.use("/", index);
app.use("/auth", auth);
app.use("/artist", artist);
app.use("/event", event);

// Port number
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
