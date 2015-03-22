(function() {
  angular
    .module('save-a-selfie.layout')
    .controller('Tabs', Tabs);

  Tabs.$inject = ['$state', '$ionicActionSheet', 'selfie'];

  function Tabs($state, $ionicActionSheet, selfie) {
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
            photoPromise = selfie.takePhoto();
          } else if (index === 1) {
            photoPromise = selfie.pickFromGallery();
          }
          return photoPromise
            .then(function() {
              $state.go('tabs.caption');
            })
            .catch(function(err) {
              // error
            });
        }
      });
    }
  }
})();