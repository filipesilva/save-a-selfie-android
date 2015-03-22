(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('Caption', Caption);

  Caption.$inject = ['$state', 'selfie'];

  function Caption($state, selfie) {
    var vm = this;
    var text;

    // members
    vm.text = text;
    vm.addCaption = addCaption;

    // functions

    function addCaption() {
      selfie.setCaption(vm.text);
      $state.go('tabs.device-type');
    }
  }
})();