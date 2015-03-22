(function() {
  angular
    .module('save-a-selfie.photo')
    .factory('upload', upload);

  upload.$inject = ['$http', '$cordovaGeolocation', 'apiUrl', 'selfie'];

  function upload($http, $cordovaGeolocation, apiUrl, selfie) {

    // members
    var service = {
      addSelfie: addSelfie
    };
    return service;

    // functions

    function addSelfie() {
      var device = selfie.getDevice();
      var typeOfObject;

      if (device === 'defibrillator') {
        typeOfObject = 0;
      } else if (device === 'life-ring') {
        typeOfObject = 1;
      } else if (device === 'first-aid-kit') {
        typeOfObject = 2;
      } else if (device === 'hydrant') {
        typeOfObject = 3;
      }

      return $cordovaGeolocation.getCurrentPosition({
          timeout: 10000,
          enableHighAccuracy: false
        })
        .then(function(position) {
          var params = {
            id: 'id',
            typeOfObject: typeOfObject,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: '',
            user: '',
            caption: selfie.getCaption(),
            image: selfie.getPhoto(),
            thumbnail: 'thumbnail'
          };
          return $http.post(
            '/wp-content/themes/magazine-child/test.something', {}, {
              params: params
            });
        });
    }
  }
})();