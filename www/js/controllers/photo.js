angular.module('save-a-selfie.controllers')
  .controller('PhotoCtrl', function($scope, $ionicActionSheet, $cordovaCamera) {
    var view = this;

    view.resolve = function() {
      $ionicActionSheet.show({
        titleText: 'Select image source',
        buttons: [{
          text: 'Take photo'
        }, {
          text: 'Choose from existing'
        }],
        // TODO go back to previous state on cancel
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          view.takePhoto();
        }
      });
    };

    // TODO refactor into service
    view.takePhoto = function() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 400,
        targetHeight: 400,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options)
        .then(function(imageData) {
          var image = document.getElementById('selfie');
          image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });
    };

    $scope.$on('$ionicView.enter', function(scopes, states) {
      view.resolve();
    });
  });
