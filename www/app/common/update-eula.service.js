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
      var data = {
        deviceID: uuid,
        EULAType: type
      };

      return $http({
          method: 'POST',
          url: apiUrl +
            '/wp/wp-content/themes/magazine-child/updateEULA.php',
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
        })
        .catch(function() {
          console.log('error submitting eula');
        });
    }
  }
})();