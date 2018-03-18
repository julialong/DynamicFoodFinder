/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
      var distance;
      var myRouteBoxer;
      var bounds;
      var searchType;
      var myMap;

      function initMap() {
        var markerArray = [];
        distance = 10;

        // Can change later to allow users to search for a variety of things
        searchType = 'restaurant';

        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService;

        // Default view centered on continental United States
        var mapSetup = {
          center: new google.maps.LatLng(40, -80.5),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom: 8
        }

        // Create a map and center it on Manhattan.
        map = new google.maps.Map(document.getElementById('map'), mapSetup);

        // Create a new RouteBoxer
        myRouteBoxer = new RouteBoxer();

        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow;

        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
        // Listen to change events from the start and end lists.
        var onChangeHandler = function() {
          calculateAndDisplayRoute(
              directionsDisplay, directionsService, markerArray, stepDisplay, map);
        };
        document.getElementById('clocation').addEventListener('change', onChangeHandler);
        document.getElementById('destination').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsDisplay, directionsService,
          markerArray, stepDisplay, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // DRIVING directions.
        directionsService.route({
          origin: document.getElementById('clocation').value,
          destination: document.getElementById('destination').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (status === 'OK') {
            document.getElementById('warnings-panel').innerHTML =
                '<b>' + response.routes[0].warnings + '</b>';
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

      function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text
          // of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, marker);
        });
      }
