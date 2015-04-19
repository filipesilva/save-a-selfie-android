(function() {
  'use strict';

  angular
    .module('save-a-selfie')
    .value('Camera', null)
    .constant('apiUrl', '/proxy');
  // TODO set this url for production, as right now the ionic proxy
  // is managing the connection to prevent CORS errors
  // .constant('apiUrl', 'http://www.saveaselfie.org');
})();
