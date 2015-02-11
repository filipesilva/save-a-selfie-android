(function() {
  angular.module('save-a-selfie.photo')
    .controller('PhotoCtrl', function(
      $scope,
      $ionicActionSheet,
      $ionicHistory,
      CameraSrvc
    ) {
      var vm = this;

      $scope.$on('$ionicView.enter', function(scopes, states) {
        vm.resolve();
      });

      vm.resolve = function() {
        var hideSheet = $ionicActionSheet.show({
          titleText: 'Select image source',
          buttons: [{
            text: 'Take photo'
          }, {
            text: 'Choose from existing'
          }],
          cancelText: 'Cancel',
          cancel: function() {
            $ionicHistory.goBack();
          },
          buttonClicked: function(index) {
            if (index === 0) {
              vm.takePhoto();
            } else if (index === 1) {
              vm.pickFromGallery();
            }
            return true;
          }
        });
      };

      vm.takePhoto = function() {
        CameraSrvc.takePhoto()
          .then(function(imageData) {
            var image = document.getElementById('selfie');
            image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            // error
          });
      };

      vm.pickFromGallery = function() {
        CameraSrvc.pickFromGallery()
          .then(function(imageData) {
            var image = document.getElementById('selfie');
            image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            // error
          });
      };
    });
})();
