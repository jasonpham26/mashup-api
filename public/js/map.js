function initMap(lat, long) {
  var options = {
    zoom: 8,
    center: { lat: lat, lng: long }
  };

  // Create new map
  var map = new google.maps.Map(document.getElementById("map"), options);
  // Listen for click on map
  google.maps.event.addListener(map, "click", event => {
    // Add marker
    addMarker({ coords: event.latLng });
  });
  var markers = [
    {
      coords: { lat: 16.0645265, lng: 108.2090754 },
      iconImage:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      content: "<h1>Home</h1>"
    },
    {
      coords: { lat: 16.0592007, lng: 108.1769167 },
      content: "<h1>Hai Chau Da Nang</h1>"
    }
  ];
}

function addMarker(props) {
  // Add marker
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map
    // icon: props.iconImage
  });

  // Check for custom icon
  if (props.iconImage) {
    marker.setIcon(props.iconImage);
  }
  // Check content
  if (props.content) {
    var infoWindow = new google.maps.InfoWindow({
      content: props.content
    });

    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });
  }
}
