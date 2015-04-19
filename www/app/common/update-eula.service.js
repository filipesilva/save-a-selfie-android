(function() {
  'use strict';

  angular
    .module('save-a-selfie.common')
    .service('updateEula', updateEula);

  updateEula.$inject = ['$http', '$cordovaDevice', 'apiUrl'];

  function updateEula($http, $cordovaDevice, apiUrl) {
    var service = {
      post: post
    };

    return service;

    function post(eula) {
      var type, uuid = $cordovaDevice.getDevice()
        .uuid;

      if (eula === 'photo') {
        type = 'EULA';
      } else if (eula === 'map') {
        type = 'map';
      }
      var params = {
        deviceID: uuid,
        EULAType: type
      };
      return $http.post(apiUrl +
          '/wp/wp-content/themes/magazine-child/updateEULA.php', {}, {
            params: params
          })
        .catch(function() {
          console.log('error submitting eula');
        });
    }
  }
})();