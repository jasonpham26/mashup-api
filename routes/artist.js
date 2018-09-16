const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Artist = mongoose.model("artists");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

router.get("/:id", ensureAuthenticated, (req, res) => {
  Artist.findOne({
    _id: req.params.id
  })
    .populate("user")
    .then(artist => {
      res.render("artist/show");
    });
});
module.exports = router;
