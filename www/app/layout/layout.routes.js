(function() {
  angular
    .module('save-a-selfie.layout')
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
