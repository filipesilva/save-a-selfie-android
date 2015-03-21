(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('Photo', Photo);

  Photo.$inject = ['$scope', 'cameraHelper'];

  function Photo($scope, cameraHelper) {
    var vm = this;

    // members
    vm.activate = activate;

    // listeners
    $scope.$on('$ionicView.enter', function(scopes, states) {
      vm.activate();
    });

    // functions
    function activate() {
      var image = document.getElementById('selfie');
      image.src = "data:image/jpeg;base64," + cameraHelper.getSelfie();
    }
  }
})();
