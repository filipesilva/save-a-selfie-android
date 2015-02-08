angular.module('save-a-selfie.controllers')
  .controller('LocateCtrl', function(
    $scope,
    $q,
    $ionicLoading,
    $cordovaGeolocation,
    uiGmapIsReady,
    MarkersSrvc
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
        markers: []
      };
    };

    // TODO handle missing geolocation permission
    // TODO make it watch position?
    view.enter = function() {
      //show loading message
      $q.when($ionicLoading.show({
          template: 'Finding your location...'
        }))
        // wait for all three promises before hiding loading box
        .then(function() {
          return $q.all([
            // wait for gmaps to be ready
            uiGmapIsReady.promise(),
            // get markers
            MarkersSrvc.get()
            .then(function(response) {
              view.map.markers = response.data;
            }),
            // get current position
            $cordovaGeolocation
            .getCurrentPosition({
              timeout: 10000,
              enableHighAccuracy: false
            })
            // update map
            .then(function(position) {
              view.map.center = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              view.map.user.coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
            })
          ]);
        })
        // TODO catch and handle error
        // hide loading message
        .finally(function() {
          $ionicLoading.hide();
        });
    };
  });
