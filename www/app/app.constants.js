(function() {
  angular
    .module('save-a-selfie')
    .value('Camera', null)
    .value('Image', Image)
    .constant('apiUrl', '');
  // TODO set this url for production, as right now the ionic proxy
  // is managing the connection to prevent CORS errors
  // .constant('apiUrl', 'http://iculture.info/saveaselfie');
})();
