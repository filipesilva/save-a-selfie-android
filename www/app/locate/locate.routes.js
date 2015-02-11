(function() {
  angular.module('save-a-selfie.locate')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('tabs.locate', {
          url: '/locate',
          views: {
            'tab-locate': {
              templateUrl: 'app/locate/locate.html',
              controller: 'LocateCtrl as locate'
            }
          }
        });
    });
})();
