(function() {
  'use strict';

  angular
    .module('save-a-selfie.photo')
    .factory('uploadSelfie', uploadSelfie);

  uploadSelfie.$inject = ['$http', '$filter', '$cordovaGeolocation',
    '$cordovaDevice', 'apiUrl', 'selfie'
  ];

  function uploadSelfie($http, $filter, $cordovaGeolocation, $cordovaDevice,
    apiUrl, selfie) {

    // members
    var service = {
      post: post
    };
    return service;

    // functions

    function post() {
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
          var data = {
            id: makeId(),
            typeOfObject: typeOfObject,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: '',
            user: '',
            caption: selfie.getCaption(),
            image: selfie.getPhoto(),
            thumbnail: selfie.getThumb(),
            deviceID: $cordovaDevice.getDevice()
              .uuid
          };
          return $http({
              method: 'POST',
              url: apiUrl +
                '/wp/wp-content/themes/magazine-child/iPhone.php',
              data: data,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                  str.push(encodeURIComponent(p) + "=" +
                    encodeURIComponent(obj[p]));
                return str.join("&");
              },
            });
        });
    }

    function makeId() {
      var text = $filter('date')(new Date(), 'yyyyMMddHHmmss');
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  }
})();