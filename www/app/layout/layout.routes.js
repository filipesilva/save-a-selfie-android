(function() {
  'use strict';
  
  angular
    .module('save-a-selfie.layout')
    .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {
        url: "/tabs",
        abstract: true,
        templateUrl: "app/layout/tabs.html",
        controller: 'Tabs as tabs'
      });
    $urlRouterProvider.otherwise('/tabs/locate');
  }
})();
