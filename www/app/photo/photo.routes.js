(function() {
  angular
    .module('save-a-selfie.photo')
    .config(routes);

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider
      .state('tabs.photo', {
        url: '/photo',
        views: {
          'tab-photo': {
            templateUrl: 'app/photo/photo.html',
            controller: 'Photo as photo'
          }
        }
      });
  }
})();
