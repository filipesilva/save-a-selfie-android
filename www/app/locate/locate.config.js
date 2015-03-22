(function() {
  angular
    .module('save-a-selfie.locate')
    .config(configure);

  configure.$inject = ['uiGmapGoogleMapApiProvider'];

  function configure(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB1KG0oaULj5KhnQww2-AWURqgxYvO3nZs',
      v: '3.18'
    });
  }
})();
