(function() {
  angular
    .module('save-a-selfie.common')
    .factory('imageResizer', imageResizer);

  imageResizer.$inject = ['$document', 'Image'];

  function imageResizer($document, Image) {
    // members
    var service = {
      resizeBase64: resizeBase64
    };
    return service;

    // functions

    // ref: http://stackoverflow.com/a/20965997/2116927
    // This will 'load' the image to use in the next function.
    function resizeBase64(base64, width, height, format, quality) {
      var img = new Image();
      img.src = base64;
      // TODO: convert ratio properly
      //console.log(img.width);
      //console.log(img.height);
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
  }
})();