(function() {
  angular.module('save-a-selfie.photo')
    .factory('CameraSrvc', function(
      $cordovaCamera
    ) {
      // members
      var service = {
        takePhoto: takePhoto,
        pickFromGallery: pickFromGallery
      };
      return service;

      // functions

      // this needs to be a function because otherwise Camera won't be
      // instanciated when angular starts and that will cause an error
      function baseOptions() {
        return {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 400,
          targetHeight: 400,
          correctOrientation: true,
          saveToPhotoAlbum: false
        };
      }

      function takePhoto() {
        var options = angular.extend({
          sourceType: Camera.PictureSourceType.CAMERA
        }, baseOptions());
        return $cordovaCamera.getPicture(options);
      }

      function pickFromGallery() {
        var options = angular.extend({
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }, baseOptions());
        return $cordovaCamera.getPicture(options);
      }

    });
})();
