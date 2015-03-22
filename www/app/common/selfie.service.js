(function() {
  angular
    .module('save-a-selfie.common')
    .factory('selfie', selfie);

  selfie.$inject = ['$cordovaCamera'];

  function selfie($cordovaCamera) {

    var picture;
    var device;

    // members
    var service = {
      takePhoto: takePhoto,
      pickFromGallery: pickFromGallery,
      setDevice: setDevice,
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
          picture = imageData;
        })
        .catch(function(err) {
          // error
        });
    }

    function setDevice(dev) {
      device = dev;
    }

    function getSelfie() {
      if (picture) {
        return picture;
      } else {
        // selfie not taken
      }
    }
  }
})();