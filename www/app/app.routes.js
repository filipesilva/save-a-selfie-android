(function() {
  angular.module('save-a-selfie')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('tabs', {
          url: "/tabs",
          abstract: true,
          templateUrl: "app/layout/tabs.html"
        });
      $urlRouterProvider.otherwise('/tabs/info');
    });
})();
