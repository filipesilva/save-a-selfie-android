angular.module('save-a-selfie.photo')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs.photo', {
        url: '/photo',
        views: {
          'tab-photo': {
            templateUrl: 'app/photo/photo.html',
            controller: 'PhotoCtrl as photo'
          }
        }
      });
  });
