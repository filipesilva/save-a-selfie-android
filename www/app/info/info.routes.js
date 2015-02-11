angular.module('save-a-selfie.info')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs.info', {
        url: '/info',
        views: {
          'tab-info': {
            templateUrl: 'app/info/info.html'
          }
        }
      });
  });
