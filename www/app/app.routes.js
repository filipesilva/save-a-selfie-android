(function() {
  angular
    .module('save-a-selfie')
    .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {
        url: "/tabs",
        abstract: true,
        templateUrl: "app/layout/tabs.html"
      });
    $urlRouterProvider.otherwise('/tabs/locate');
  }
})();
