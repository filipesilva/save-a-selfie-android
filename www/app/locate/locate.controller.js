(function() {
  angular
    .module('save-a-selfie.locate')
    .controller('LocateCtrl', locate);

  locate.$inject = ['$scope', '$q', '$ionicLoading', '$cordovaGeolocation',
    'uiGmapGoogleMapApi', 'markers', 'mapDisclaimer'
  ];

  function locate($scope, $q, $ionicLoading, $cordovaGeolocation,
    uiGmapGoogleMapApi, markers, mapDisclaimer) {
    var vm = this;

    // members
    vm.activate = activate;
    vm.initialize = initialize;

    // listeners
    $scope.$on('$ionicView.enter', vm.activate);

    $scope.$on('$ionicView.loaded', vm.initialize);

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
        markers: [],
        markersEvents: {
          click: function(marker, eventName, model, args) {
            vm.map.window.model = model;
            vm.map.window.show = true;
          }
        },
        markerOptions: {
          icon: {
            anchor: {
              x: 24,
              y: 24
            }
          },
        },
        window: {
          show: false,
          closeClick: function() {
            this.show = false;
          },
          options: {
            pixelOffset: {
              height: -15,
              width: 0
            }
          }
        }
      };
    }

    // TODO make it watch position?
    function activate() {
      //show loading message
      mapDisclaimer.show()
        .then(function() {
          return $ionicLoading.show({
            template: 'Finding your location...'
          });
        })
        // wait for gmaps to be ready
        .then(function() {
          return uiGmapGoogleMapApi;
        })
        .then(function() {
          // get current position
          return $cordovaGeolocation.getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: false
          });
        })
        .then(function(position) {
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
        .then(function() {
          // get markers
          return markers.get();
        })
        .then(function(response) {
          vm.map.markers = response.data;
        })
        // TODO catch and handle error
        // hide loading message
        .finally(function() {
          $ionicLoading.hide();
        });
    }
  }
})();