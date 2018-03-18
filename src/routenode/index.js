 
 const express = require('express');
 const bodyParser = require('body-parser');
 const app = express();
 var boxer = require('./RouteBoxer.js');
 app.use(bodyParser.json());

 var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD2BrKN99jk1p--LmEgE9vAK0ynnfCnHnI'
});
 var start;
 var end;

app.listen(3000, () => console.log('App listening on port 3000!'));

app.post('/index', function(request, result) {
	//start = request.body.clocation,
	//end = request.body.destination;
	start = "300 Swift Avenue, Durham, NC",
	end = "Duke University, Durham, NC";
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

        console.log(start);
        console.log(end);

        // Create a new RouteBoxer
        //myRouteBoxer = boxer.RouteBoxer();

        googleMapsClient.geocode({address: start}, function(err, response) {
        		console.log(result.geometry.location.lat);
        		console.log(result.geometry.location.lat);
        		if (!err) {
      				myStartLatLng = { lat: result.geometry.location.lat,
      				lng: result.geometry.location.lng } ;
      			}
      			else {
      				myStartLatLng = { lat: 0,
      				lng: 0 } ;
      			}
        	});
        googleMapsClient.geocode({address: end}, function(err, response) {
        		if (!err) {
      				myEndLatLng = { lat: result.geometry.location.lat,
      				lng: result.geometry.location.lng } ;
      			}
      			else {
      				myEndLatLng = { lat: 0,
      				lng: 0 } ;
      			}
        	});

        calculateRoute();
      }

      function calculateRoute() {
        // Retrieve the start and end locations and create a DirectionsRequest using
        // DRIVING directions.
        googleMapsClient.directions({
          origin: myStartLatLng,
          destination: myEndLatLng,
          travelMode: 'DRIVING'
        }, function(err, response) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (!err) {
            var path = response.routes[0].overview_path;
            //bounds = myRouteBoxer.box(path, distance);
            //searchBounds(bounds);
          } else {
     		// TODO: handle error
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
        //TODO: search for restaurants
      }