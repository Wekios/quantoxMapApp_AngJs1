var app = angular.module('quantox', ['google-maps']);

app.controller('MainCtrl', function($scope, $document) {
  // mapa
  $scope.map = {
    control: {},
    center: {
        latitude: 44.7866,
        longitude: 20.4489
    },
    zoom: 14
  };
  
  // marker object
  $scope.marker = {
    center: {
        latitude: 44.7855,
        longitude: 20.4489
    }
  }
  
  //direkcije
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  
  //default pocetno
  $scope.directions = {
    origin: "Gospodara Vučića 245, Beograd, Srbija",
    destination: "Novi Sad, Srbija",
    showList: false
  }
  
  //get sa google map api
  $scope.getDirections = function () {
    var request = {
      origin: $scope.directions.origin,
      destination: $scope.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap($scope.map.control.getGMap());
        directionsDisplay.setPanel(document.getElementById('directionsList'));
        $scope.directions.showList = true;
      } else {
        alert('Google route unsuccesfull!');
      }
    });
  }
});
