(function() {
  angular
    .module('save-a-selfie.common')
    .factory('selfie', selfie);

  selfie.$inject = ['$cordovaCamera', 'imageProcessor'];

  function selfie($cordovaCamera, imageProcessor) {
    var photo, thumb, caption, device;

    // members
    var service = {
      takePhoto: takePhoto,
      pickFromGallery: pickFromGallery,
      setCaption: setCaption,
      getCaption: getCaption,
      setDevice: setDevice,
      getDevice: getDevice,
      getPhoto: getPhoto,
      getThumb: getThumb
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
          var cleanPhoto = "data:image/jpeg;base64," + imageData;
          thumb = imageProcessor.resizeBase64(cleanPhoto, 150, 150,
            'jpeg', 0.8);
          return imageProcessor.addLogos(cleanPhoto, 'jpeg', 0.8);
        })
        .then(function(img) {
          photo = img;
        })
        .catch(function() {
          console.log('error taking photo');
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

    function getDevice() {
      return device;
    }

    function getPhoto() {
      return photo;
    }

    function getThumb() {
      return thumb;
    }
  }
})();