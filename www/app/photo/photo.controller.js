(function() {
  angular.module('save-a-selfie.photo')
    .controller('PhotoCtrl', function(
      $scope,
      $ionicActionSheet,
      $ionicHistory,
      cameraHelper
    ) {
      var vm = this;

      // members
      vm.activate = activate;
      vm.takePhoto = takePhoto;
      vm.pickFromGallery = pickFromGallery;

      // listeners
      $scope.$on('$ionicView.enter', function(scopes, states) {
        vm.activate();
      });

      // functions
      function activate() {
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
      }

      function takePhoto() {
        cameraHelper.takePhoto()
          .then(function(imageData) {
            var image = document.getElementById('selfie');
            image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            // error
          });
      }

      function pickFromGallery() {
        cameraHelper.pickFromGallery()
          .then(function(imageData) {
            var image = document.getElementById('selfie');
            image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            // error
          });
      }
    });
})();
