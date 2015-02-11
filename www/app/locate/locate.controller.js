(function() {
  angular.module('save-a-selfie.locate')
    .controller('LocateCtrl', function(
      $scope,
      $q,
      $ionicLoading,
      $cordovaGeolocation,
      uiGmapIsReady,
      MarkersSrvc
    ) {
      var vm = this;

      // members
      vm.activate = activate;
      vm.initialize = initialize;

      // listeners
      $scope.$on('$ionicView.enter', function(scopes, states) {
        vm.activate();
      });

      $scope.$on('$ionicView.loaded', function(scopes, states) {
        vm.initialize();
      });

      // functions
      function initialize() {
        // initial map position, dublin
        var initial = {
          latitude: 53.3243201,
          longitude: -6.251695
        };
        vm.map = {
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
      }

      // TODO handle missing geolocation permission
      // TODO make it watch position?
      function activate() {
        //show loading message
        $q.when($ionicLoading.show({
            template: 'Finding your location...'
          }))
          // wait for all three promises before hiding loading box
          .then(function() {
            return $q.all([
              // wait for gmaps to be ready
              // TODO there still seems to be a delay on mobile
              uiGmapIsReady.promise(),
              // get markers
              MarkersSrvc.get()
              .then(function(response) {
                vm.map.markers = response.data;
              }),
              // get current position
              $cordovaGeolocation.getCurrentPosition({
                timeout: 10000,
                enableHighAccuracy: false
              })
              // update map
              .then(function(position) {
                vm.map.center = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                };
                vm.map.user.coords = {
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
      }
    });
})();
