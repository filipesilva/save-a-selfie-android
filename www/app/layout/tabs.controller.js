(function() {
  angular
    .module('save-a-selfie.layout')
    .controller('Tabs', Tabs);

  Tabs.$inject = ['$state', '$ionicActionSheet', 'cameraHelper'];

  function Tabs($state, $ionicActionSheet, cameraHelper) {
    var vm = this;

    // members
    vm.showPhotoOptions = showPhotoOptions;

    // functions
    function showPhotoOptions() {
      var hideSheet = $ionicActionSheet.show({
        titleText: 'Select image source',
        buttons: [{
          text: 'Take photo'
        }, {
          text: 'Choose from existing'
        }],
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          var photoPromise;
          if (index === 0) {
            photoPromise = cameraHelper.takePhoto();
          } else if (index === 1) {
            photoPromise = cameraHelper.pickFromGallery();
          }
          return photoPromise
            .then(function() {
              $state.go('tabs.photo');
            })
            .catch(function(err) {
              // error
            });
        }
      });
    }
  }
})();