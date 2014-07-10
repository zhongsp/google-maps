angular.module('gMapApp', ['google-maps'])
  .controller('GoogleMapController', ['$scope', function($scope) {
    $scope.map = {
      center: {
        latitude: -37.83232752310328,
        longitude: 144.93427991867065
      },
      zoom: 16,
      marker: {
        coords: {
          latitude: -37.83232752310328,
          longitude: 144.93427991867065
        },
        icon: 'images/google-marker.png',
        options: {
          animation: google.maps.Animation.DROP,
          title: 'Fabric Group'
        }
      }
    }
  }]);