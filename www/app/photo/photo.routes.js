(function() {
  angular
    .module('save-a-selfie.photo')
    .config(routes);

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider
      .state('tabs.device-type', {
        url: '/photo',
        views: {
          'tab-photo': {
            templateUrl: 'app/photo/device-type.html',
            controller: 'DeviceType as deviceType'
          }
        }
      }).state('tabs.caption', {
        url: '/photo',
        views: {
          'tab-photo': {
            templateUrl: 'app/photo/caption.html',
            controller: 'Caption as caption'
          }
        }
      }).state('tabs.upload', {
        url: '/photo',
        views: {
          'tab-photo': {
            templateUrl: 'app/photo/upload.html',
            controller: 'Upload as upload'
          }
        }
      });
  }
})();
