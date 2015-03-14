(function() {
  angular
    .module('save-a-selfie.locate')
    .config(configure);

  configure.$inject = ['uiGmapGoogleMapApiProvider'];

  function configure(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      // TODO add api key
      // key: 'your api key',
      v: '3.17'
    });
  }
})();
