(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('Preview', Preview);

  Preview.$inject = ['$scope', 'selfie'];

  function Preview($scope, selfie) {
    var vm = this;
    var selfieSrc;
    var iconSrc;
    var caption;

    // members
    vm.activate = activate;
    vm.uploadSelfie = uploadSelfie;
    vm.selfieSrc = selfieSrc;
    vm.iconSrc = iconSrc;
    vm.caption = caption;

    // listeners
    $scope.$on('$ionicView.beforeEnter', function(scopes, states) {
      vm.activate();
    });

    // functions
    function activate() {
      vm.selfieSrc = selfie.getSelfieSrc();
      vm.iconSrc = selfie.getIconSrc();
      vm.caption = selfie.getCaption();
    }

    function uploadSelfie() {
      // body...
    }
  }
})();