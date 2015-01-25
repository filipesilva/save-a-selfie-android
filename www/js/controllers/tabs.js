angular.module('save-a-selfie.controllers')
.controller('TabsCtrl', function($state, $ionicActionSheet) {
    var view = this;

    view.showPhotoOptions = function () {
      $ionicActionSheet.show({
        titleText: 'Select image source',
        buttons: [{
          text: 'Take photo'
        }, {
          text: 'Choose from existing'
        }],
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          $state.go('tabs.photo');
        }
      });
    };

  });
