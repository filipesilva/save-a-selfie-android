(function() {
  'use strict';

  angular
    .module('save-a-selfie.photo')
    .service('photoEula', photoEula);

  photoEula.$inject = ['$q', '$window', '$ionicPopup', 'apiUrl', 'updateEula'];

  function photoEula($q, $window, $ionicPopup, apiUrl, updateEula) {
    var service = {
      show: show
    };

    return service;

    function show() {
      if (alreadyAccepted()) {
        return $q.when();
      } else {
        var url = apiUrl + '/SASDocs/EULA.html';
        return $ionicPopup.confirm({
            title: 'End User License Agreement',
            template: 'I accept the <a href="#" onclick="window.open(\'' +
              url + '\', \'_system\');">EULA for Save-a-Selfie</a>.'
          })
          .then(function(res) {
            if (!res) {
              return $q.reject();
            }
          })
          .then(saveAcceptance);
      }
    }

    function alreadyAccepted() {
      return $window.localStorage.getItem('eula') === 'accepted';
    }

    function saveAcceptance() {
      updateEula.post('photo').then(function () {
        $window.localStorage.setItem('eula', 'accepted');
      });
    }
  }
})();