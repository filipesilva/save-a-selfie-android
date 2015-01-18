angular.module('save-a-selfie.controllers')
  .controller('LocateCtrl', function($rootScope, $cordovaGeolocation) {
    var view = this;
    view.map = {
      zoom: 16,
      markers: [{
        id: '1',
        coords: {
          latitude: 53.3442,
          longitude: -6.2555
        }
      }, {
        id: '2',
        coords: {
          latitude: 53.3580,
          longitude: -6.2495
        }
      }, {
        id: '3',
        coords: {
          latitude: 53.3495,
          longitude: -6.2349
        }
      }, {
        id: '4',
        coords: {
          latitude: 53.3371,
          longitude: -6.2343
        }
      }, {
        id: '5',
        coords: {
          latitude: 53.3386,
          longitude: -6.2883
        }
      }]
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
