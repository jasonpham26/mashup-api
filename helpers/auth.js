// This file contains helper function for authentication
module.exports = {
  // Check if user is logged in
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
  // If guest
  ensureGuest: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  }
};
