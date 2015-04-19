(function() {
  'use strict';
  
  angular
    .module('save-a-selfie.info')
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('tabs.info', {
        url: '/info',
        views: {
          'tab-info': {
            templateUrl: 'app/info/info.html',
            controller: 'Info as info'
          }
        }
      });
  }
})();
