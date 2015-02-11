(function() {
  angular.module('save-a-selfie')
    .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        // TODO add api key
        // key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
      });
    });
})();
