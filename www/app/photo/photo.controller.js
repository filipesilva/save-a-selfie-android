angular.module('save-a-selfie.photo')
  .controller('PhotoCtrl', function(
    $scope,
    $ionicActionSheet,
    $ionicHistory,
    CameraSrvc
  ) {
    var view = this;

    $scope.$on('$ionicView.enter', function(scopes, states) {
      view.resolve();
    });

    view.resolve = function() {
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
            view.takePhoto();
          } else if (index === 1) {
            view.pickFromGallery();
          }
          return true;
        }
      });
    };

    view.takePhoto = function() {
      CameraSrvc.takePhoto()
        .then(function(imageData) {
          var image = document.getElementById('selfie');
          image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });
    };

    view.pickFromGallery = function() {
      CameraSrvc.pickFromGallery()
        .then(function(imageData) {
          var image = document.getElementById('selfie');
          image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });
    };
  });
