angular.module('save-a-selfie.controllers')
  .controller('PhotoCtrl', function($scope, $ionicActionSheet, CameraSrvc) {
    var view = this;

    // TODO this seems to appear again after picking photo
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
          if (index === 0) {
            view.takePhoto();
          } else if (index === 1) {
            view.pickFromGallery();
          }
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

    $scope.$on('$ionicView.enter', function(scopes, states) {
      view.resolve();
    });
  });
