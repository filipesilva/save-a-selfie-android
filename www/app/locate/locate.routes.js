(function() {
  'use strict';
  
  angular
    .module('save-a-selfie.locate')
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
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
  }
})();
