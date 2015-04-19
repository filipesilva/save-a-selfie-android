(function() {
  'use strict';

  angular
    .module('save-a-selfie.locate')
    .service('mapEula', mapEula);

  mapEula.$inject = ['$q', '$window', '$http', '$ionicPopup', 'updateEula'];

  function mapEula($q, $window, $http, $ionicPopup, updateEula) {
    var service = {
      show: show
    };

    return service;

    function show() {
      if (alreadyAccepted()) {
        return $q.when();
      } else {
        return $ionicPopup.confirm({
            title: 'Disclaimer',
            template: 'The information here is correct to the best of our knowledge, but its use is at your risk and discretion, with no liability to Save a Selfie, the developers or Google.'
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
      return $window.localStorage.getItem('mapDisclaimer') === 'accepted';
    }

    function saveAcceptance() {
      updateEula.post('map').then(function () {
        $window.localStorage.setItem('mapDisclaimer', 'accepted');
      });
    }
  }
})();