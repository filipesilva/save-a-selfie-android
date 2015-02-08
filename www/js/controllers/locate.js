angular.module('save-a-selfie.controllers')
  .controller('LocateCtrl', function(
    $scope,
    $q,
    $ionicLoading,
    $cordovaGeolocation,
    uiGmapIsReady
  ) {
    var view = this;

    $scope.$on('$ionicView.enter', function(scopes, states) {
      view.enter();
    });

    $scope.$on('$ionicView.loaded', function(scopes, states) {
      view.loaded();
    });

    view.loaded = function() {
      // initial map position, dublin
      var initial = {
        latitude: 53.3243201,
        longitude: -6.251695
      };
      view.map = {
        zoom: 13,
        center: {
          latitude: initial.latitude,
          longitude: initial.longitude
        },
        user: {
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
            latitude: initial.latitude,
            longitude: initial.longitude
          }
        },
        // TODO load markers from backend
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
    };

    // TODO handle missing geolocation permission
    // TODO make it watch position?
    view.enter = function() {
      // show loading message
      $q.when($ionicLoading.show({
          template: 'Finding your location...'
        }))
        // wait for gmaps to be ready
        .then(function() {
          return uiGmapIsReady.promise();
        })
        // get position
        .then(function() {
          return $cordovaGeolocation
            .getCurrentPosition({
              timeout: 10000,
              enableHighAccuracy: false
            });
        })
        // update gmaps
        .then(function(position) {
          view.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          view.map.user = {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          };
        }, function(err) {
          // error
        })
        // hide loading message
        .finally(function(response) {
          $ionicLoading.hide();
        });
    };
  });
