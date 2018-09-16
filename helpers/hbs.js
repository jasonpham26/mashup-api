const keys = require("../config/keys");
module.exports = {
  initMap: function(lat, long) {
    var map = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=12&size=1156x1000&markers=color:red%7Clabel:S%7C${lat},${long}&key=${
      keys.googleAPI
    }`;
    return map;
  }
};
