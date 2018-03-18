 
 const express = require('express');
 const bodyParser = require('body-parser');
 const app = express();
 app.use(bodyParser.json());

 var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD2BrKN99jk1p--LmEgE9vAK0ynnfCnHnI'
});
 var start;
 var end;

app.post('/index', function(request, result) {
	start: request.body.clocation;
	end: request.body.destination;
	initMap();
    });

      var distance;
      var myRouteBoxer;
      var bounds;
      var mySearchType;
      var myMap;

      function initMap() {
        var markerArray = [];
        distance = 10;

        // Can change later to allow users to search for a variety of things
        mySearchType = 'restaurant';

        // Create a new RouteBoxer
        myRouteBoxer = new RouteBoxer();

        var myStartLatLng = googleMapsClient.geocode({
        	address: start}, function(err, result) {
        		if (!err) {
      				return result.json.results;
      			}
        	});
        var myEndLatLng = googleMapsClient.geocode({
        	address: end}, function(err, result) {
        		if (!err) {
      				return result.json.results;
      			}
        	});

        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
      }

      function calculateAndDisplayRoute(map) {
        // Retrieve the start and end locations and create a DirectionsRequest using
        // DRIVING directions.
        directionsService.route({
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (status === 'OK') {
            var path = response.routes[0].overview_path;
            bounds = myRouteBoxer.box(path, distance);
            searchBounds(bounds);
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      // Searches all rectangle bounds for relevant keywords
      function searchBounds(bounds) {
        for (var i = 0; i < bounds.length; i++) {
          searchSingleBound(bounds[i]);
        }
      }

      // Searches one bound object for relevant keywords
      function searchSingleBound(bound) {
        var request = {
          location : bound,
          keyword : searchType
        }
        addMarker(bound.getCenter(), "here");
        //TODO: search for restaurants
      }

      function addMarker(latlng, name) {
        var marker = new google.maps.Marker({
          position : latlng,
          map : map,
          title : name
        });
      }