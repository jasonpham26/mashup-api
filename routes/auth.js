const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private", "user-top-read"]
  })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

router.get("/verify", (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log("Not Auth");
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
