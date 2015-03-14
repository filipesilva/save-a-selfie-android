(function() {
  angular
    .module('save-a-selfie.locate')
    .controller('LocateCtrl', locate);

  locate.$inject = ['$scope', '$q', '$ionicLoading', '$cordovaGeolocation',
    'uiGmapGoogleMapApi', 'markers'
  ];

  function locate($scope, $q, $ionicLoading, $cordovaGeolocation,
    uiGmapGoogleMapApi, markers) {
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

    // TODO make it watch position?
    function activate() {
      //show loading message
      $q.when($ionicLoading.show({
          template: 'Finding your location...'
        }))
        // wait for gmaps to be ready
        .then(function() {
          return uiGmapGoogleMapApi;
        })
        .then(function() {
          // get markers
          return markers.get();
        })
        .then(function(response) {
          vm.map.markers = response.data;
        })
        .then(function() {
          // get current position
          return $cordovaGeolocation.getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: false
          });
        })
        .then(function(position) {
          // TODO map doesn't seem to be centering on first update
          // update map
          vm.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          vm.map.user.coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        })
        // TODO catch and handle error
        // hide loading message
        .finally(function() {
          $ionicLoading.hide();
        });
    }
  }
})();