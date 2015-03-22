(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('Caption', Caption);

  Caption.$inject = ['$state', 'selfie'];

  function Caption($state, selfie) {
    var vm = this;

    // members
    vm.text = '';
    vm.addCaption = addCaption;

    // listeners
    $scope.$on('$ionicView.enter', function(scopes, states) {
      vm.text = '';
    });

    // functions

    function addCaption() {
      selfie.setCaption(vm.text);
      $state.go('tabs.device-type');
    }
  }
})();