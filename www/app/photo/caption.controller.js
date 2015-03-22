(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('Caption', Caption);

  Caption.$inject = ['$scope'];

  function Caption($scope) {
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