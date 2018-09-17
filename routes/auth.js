const express = require("express");
const router = express.Router();
const passport = require("passport");


// Login and specify scope
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private", "user-top-read"]
  })
);

// Callback handling
router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/getArtists");
  }
);

// Verification
router.get("/verify", (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log("Not Auth");
  }
});


// Logout 
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
