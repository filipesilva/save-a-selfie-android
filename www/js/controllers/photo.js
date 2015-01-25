angular.module('save-a-selfie.controllers')
  .controller('PhotoCtrl', function($scope, $cordovaCamera) {
    var view = this;

    this.resolve = function() {
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

      $cordovaCamera.getPicture(options).then(function(imageData) {
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
