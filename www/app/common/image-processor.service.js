(function() {
  angular
    .module('save-a-selfie.common')
    .factory('imageProcessor', imageProcessor);

  imageProcessor.$inject = ['$document', '$q', 'apiUrl'];

  function imageProcessor($document, $q, apiUrl) {
    // members
    var service = {
      resizeBase64: resizeBase64,
      addLogos: addLogos
    };
    return service;

    // functions

    // ref: http://stackoverflow.com/a/20965997/2116927
    // This will 'load' the image to use in the next function.
    function resizeBase64(base64, width, height, format, quality) {
      var ratio, img = new Image();
      img.src = base64;
      ratio = img.width / img.height;
      if (ratio > 1) {
        height = height / ratio;
      } else {
        width = width * ratio;
      }
      return imageToDataUri(img, width, height, format, quality);
    }

    // ref: http://stackoverflow.com/a/20965997/2116927
    // This will provide a bitmap buffer and native compiled
    // code to encode the image data.
    function imageToDataUri(img, width, height, format, quality) {
      // create an off-screen canvas
      var canvas = $document[0].createElement('canvas'),
        ctx = canvas.getContext('2d');
      // set its dimension to target size
      canvas.width = width;
      canvas.height = height;
      // draw source image into the off-screen canvas:
      ctx.drawImage(img, 0, 0, width, height);
      // encode image to data-uri with base64 version of compressed image
      return canvas.toDataURL('image/' + format, quality);
    }

    function addLogos(base64, format, quality) {
      var logoPromises, img = new Image(),
        canvas = $document[0].createElement('canvas');

      img.src = base64;
      ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      logoPromises = {
        topLeftLogo: asyncImage(apiUrl + "/SASDocs/topLeftLogo.png"),
        bottomRightLogo: asyncImage(apiUrl +
          "/SASDocs/bottomRightLogo.png")
      };

      return $q.all(logoPromises).then(function (resolvedPromises) {
        var topLeftLogo = resolvedPromises.topLeftLogo;
        var bottomRightLogo = resolvedPromises.bottomRightLogo;
        ctx.drawImage(topLeftLogo, 20, 20, topLeftLogo.width, topLeftLogo.height);
        ctx.drawImage(bottomRightLogo,
          canvas.width - bottomRightLogo.width - 20,
          canvas.height - bottomRightLogo.height - 20,
          bottomRightLogo.width, bottomRightLogo.height);
        return canvas.toDataURL('image/' + format, quality);
      });
    }

    function asyncImage(src) {
      return $q(function(resolve, reject) {
        var img = new Image();
        img.onload = function() {
          resolve(img);
        };
        img.src = src;
      });
    }
  }
})();