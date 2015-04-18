(function() {
  'use strict';

  angular
    .module('save-a-selfie.locate')
    .service('mapDisclaimer', mapDisclaimer);

  mapDisclaimer.$inject = ['$q', '$window', '$ionicPopup'];

  function mapDisclaimer($q, $window, $ionicPopup) {
    var service = {
      show: show
    };

    return service;

    function show() {
      if (alreadyAccepted()) {
        return $q.when();
      } else {
        return $ionicPopup.alert({
            title: 'Disclaimer',
            template: 'The information here is correct to the best of our knowledge, but its use is at your risk and discretion, with no liability to Save a Selfie, the developers or Google.'
          })
          .then(saveAcceptance);
      }
    }

    function alreadyAccepted() {
      return $window.localStorage.getItem('mapDisclaimer') === 'accepted';
    }

    function saveAcceptance() {
      $window.localStorage.setItem('mapDisclaimer', 'accepted');
    }
  }
})();