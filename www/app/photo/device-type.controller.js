(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('DeviceType', DeviceType);

  DeviceType.$inject = ['$scope'];

  function DeviceType($scope) {
    var vm = this;

    // members
    vm.activate = activate;

    // listeners
    $scope.$on('$ionicView.enter', function(scopes, states) {
      vm.activate();
    });

    // functions
    function activate() {

    }
  }
})();