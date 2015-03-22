(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('Preview', Preview);

  Preview.$inject = ['$scope', '$state', 'selfie', 'upload'];

  function Preview($scope, $state, selfie, upload) {
    var vm = this;
    var selfieSrc;
    var deviceIconSrc;
    var caption;

    // members
    vm.activate = activate;
    vm.uploadSelfie = uploadSelfie;
    vm.caption = caption;
    vm.selfieSrc = selfieSrc;
    vm.deviceIconSrc = deviceIconSrc;

    // listeners
    $scope.$on('$ionicView.beforeEnter', function(scopes, states) {
      vm.activate();
    });

    // functions
    function activate() {
      vm.caption = selfie.getCaption();
      // TODO: handle missing image maybe
      vm.selfieSrc = "data:image/jpeg;base64," + selfie.getSelfie();

      var device = selfie.getDevice();

      if (device === 'defibrillator') {
        vm.deviceIconSrc = 'img/defibrillator-marker-icon.png';
      } else if (device === 'life-ring') {
        vm.deviceIconSrc = 'img/life-ring-marker-icon.png';
      } else if (device === 'first-aid-kit') {
        vm.deviceIconSrc = 'img/first-aid-kit-marker-icon.png';
      } else if (device === 'hydrant') {
        vm.deviceIconSrc = 'img/hydrant-marker-icon.png';
      }
    }

    function uploadSelfie() {
      upload.addSelfie()
        .then(function() {
          // $state.go('tab.locate');
        })
        .catch(function(error) {
          // error
        });
    }
  }
})();