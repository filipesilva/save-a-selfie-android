angular.module('save-a-selfie.services')
  .factory('CameraSrvc', function(
    $cordovaCamera
  ) {

    // this needs to be a function because otherwise Camera won't be
    // instanciated when angular starts and that will cause an error
    var baseOptions = function() {
      return {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        saveToPhotoAlbum: false
      };
    };

    return {
      takePhoto: function() {
        var options = angular.extend({
          sourceType: Camera.PictureSourceType.CAMERA
        }, baseOptions());
        return $cordovaCamera.getPicture(options);
      },
      pickFromGallery: function() {
        var options = angular.extend({
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }, baseOptions());
        return $cordovaCamera.getPicture(options);
      }
    };
  });
