(function() {
  angular
    .module('save-a-selfie.photo')
    .factory('upload', upload);

  upload.$inject = ['$http', 'apiUrl', 'selfie'];

  function upload($http, apiUrl, selfie) {

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

      var params = {
        id: 'aaa',
        typeOfObject: typeOfObject,
        latitude: 'latitude',
        longitude: 'longitude',
        location: 'location',
        user: 'user',
        caption: selfie.getCaption(),
        image: selfie.getSelfie(),
        thumbnail: 'thumbnail'
      };
      return $http.get('/wp-content/themes/magazine-child/test.something', {
        params: params
      });
    }
  }
})();