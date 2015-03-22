(function() {
  angular
    .module('save-a-selfie.photo')
    .controller('Upload', Upload);

  Upload.$inject = ['$scope'];

  function Upload($scope) {
    var vm = this;

    // members
    vm.activate = activate;

    // listeners
    $scope.$on('$ionicView.enter', function(scopes, states) {
      vm.activate();
    });

    // functions
    function activate() {
      //var image = document.getElementById('selfie');
      //image.src = "data:image/jpeg;base64," + selfie.getSelfie();
    }
  }
})();