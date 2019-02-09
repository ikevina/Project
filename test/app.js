var Data = "C:\Users\Ike\Desktop\test\Data.csv\Fires_cleaned.csv"

function markerSize(FIRE_SIZE_CLASS) {
  return FIRE_SIZE_CLASS * A-G;
}

function markerColor(FIRE_SIZE_CLASS) {
  if (FIRE_SIZE_CLASS = A) {
      return "#ADFF2F";
  } else if (FIRE_SIZE_CLASS = B) {
      return "#9ACD32";
  } else if (FIRE_SIZE_CLASS = C) {
      return "#FFFF00";
  } else if (FIRE_SIZE_CLASS = D) {
      return "#ffd700";
  } else if (FIRE_SIZE_CLASS = E) {
      return "#FFA500";
  } else {
      return "#FF0000";
  };
}

// Perform a GET request to the query Data
d3.csv(Data, function(csv) {
  Data.csv.filter(function(row) {
      //console.log(Data);
      return row['FIRE_SIZE_CLASS'], row['LATITUDE'], row[LONGITUDE];
  });
d3.csv(Data, function(data) {
  //  Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});
    //console.log(data);


function createFeatures(wildfires) {

  var wildfires = L.geoJSON(wildfiresData, {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
 onEachFeature : function (feature, layer) {

    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> FIRE_SIZE_CLASS: " +  feature.properties.FIRE_SIZE_CLASS + "</p>")
    },     pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: markerSize(feature.properties.FIRE_SIZE_CLASS),
        fillColor: markerColor(feature.properties.FIRE_SIZE_CLASS),
        fillOpacity: 1,
        stroke: false,
    })
  }
  });
    


  // Sending our earthquakes layer to the createMap function
  createMap(wildfires);
};

// function createMap(wildfires);

  // Define satelitemap and darkmap layers
  var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satelite Map": satelitemap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Wildfires: wildfires
  };

  // Create our map, giving it the satelitemap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [31.57853542647338,-99.580078125],
    zoom: 3,
    layers: [satelitemap, wildfires]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend'),
          FIRE_SIZE_CLASS = [A, B, C, D, E, F, G];
  
      for (var i = 0; i < FIRE_SIZE_CLASS.length; i++) {
          div.innerHTML +=
              '<i style="background:' + markerColor(FIRE_SIZE_CLASS[i] + 1) + '"></i> ' + 
      + FIRE_SIZE_CLASS[i] + (FIRE_SIZE_CLASS[i + 1] ? ' - ' + FIRE_SIZE_CLASS[i + 1] + '<br>' : ' + ');
      }
  
      return div;
  };
  
  legend.addTo(myMap);
});
