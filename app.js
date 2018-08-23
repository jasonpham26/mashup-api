const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const port = process.env.PORT || 5000;
// Handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// ROUTES
// Index Route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});
