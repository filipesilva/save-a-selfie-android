(function() {
  angular
    .module('save-a-selfie.common')
    .factory('cameraHelper', cameraHelper);

  cameraHelper.$inject = ['$cordovaCamera'];

  function cameraHelper($cordovaCamera) {

    var selfie;

    // members
    var service = {
      takePhoto: takePhoto,
      pickFromGallery: pickFromGallery,
      getSelfie: getSelfie
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
        saveToPhotoAlbum: false,
        mediaType: Camera.MediaType.PICTURE
      };
    }

    function takePhoto() {
      var options = angular.extend({
        sourceType: Camera.PictureSourceType.CAMERA
      }, baseOptions());
      return saveSelfie(options);
    }

    function pickFromGallery() {
      var options = angular.extend({
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      }, baseOptions());
      return saveSelfie(options);
    }

    function saveSelfie(options) {
      return $cordovaCamera.getPicture(options)
        .then(function(imageData) {
          selfie = imageData;
        })
        .catch(function(err) {
          // error
        });
    }

    function getSelfie() {
      if (selfie) {
        return selfie;
      } else {
        // selfie not taken
      }
    }
  }
})();