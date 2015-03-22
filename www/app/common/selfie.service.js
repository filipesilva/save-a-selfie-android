(function() {
  angular
    .module('save-a-selfie.common')
    .factory('selfie', selfie);

  selfie.$inject = ['$cordovaCamera'];

  function selfie($cordovaCamera) {

    var photo;
    var caption;
    var device;

    // members
    var service = {
      takePhoto: takePhoto,
      pickFromGallery: pickFromGallery,
      setCaption: setCaption,
      getCaption: getCaption,
      setDevice: setDevice,
      getSelfieSrc: getSelfieSrc,
      getIconSrc: getIconSrc
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
          photo = imageData;
        })
        .catch(function(err) {
          // error
        });
    }

    function setCaption(cap) {
      caption = cap;
    }

    function getCaption() {
      return caption;
    }

    function setDevice(dev) {
      device = dev;
    }

    function getIconSrc() {
      if (device === 'defibrillator'){
        return 'img/defibrillator-marker-icon.png';
      } else if (device === 'life-ring'){
        return 'img/life-ring-marker-icon.png';
      } else if (device === 'first-aid-kit'){
        return 'img/first-aid-kit-marker-icon.png';
      } else if (device === 'hydrant'){
        return 'img/hydrant-marker-icon.png';
      } else {
        return '';
      }
    }

    function getSelfieSrc() {
      if (photo) {
        return "data:image/jpeg;base64," + photo;
      } else {
        // selfie not taken
      }
    }
  }
})();