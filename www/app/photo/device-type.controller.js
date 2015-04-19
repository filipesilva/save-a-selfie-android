(function() {
  'use strict';
  
  angular
    .module('save-a-selfie.photo')
    .controller('DeviceType', DeviceType);

  DeviceType.$inject = ['$state', 'selfie'];

  function DeviceType($state, selfie) {
    var vm = this;

    // members
    vm.selectDevice = selectDevice;

    // functions

    function selectDevice(device) {
      selfie.setDevice(device);
      $state.go('tabs.preview');
    }
  }
})();