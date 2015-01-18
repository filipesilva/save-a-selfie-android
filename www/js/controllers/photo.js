angular.module('save-a-selfie.controllers')
  .controller('PhotoCtrl', function($rootScope, $cordovaGeolocation) {
    var view = this;
    view.map = {
      zoom: 16,
      options: {
        draggable: false
      }
    };

    // TODO handle missing geolocation permission, loading
    // TODO make it watch position
    this.resolve = function() {
      $cordovaGeolocation
        .getCurrentPosition({
          timeout: 10000,
          enableHighAccuracy: false
        })
        .then(function(position) {
          view.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          view.map.user = {
            id: 'user',
            options: {
              icon: {
                anchor: {
                  x: 24,
                  y: 24
                },
                url: 'img/user-location-marker.png'
              }
            },
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          };
        }, function(err) {
          // error
        });

    };

    $rootScope.$on('$ionicView.enter', function(scopes, states) {
      view.resolve();
    });
  });
