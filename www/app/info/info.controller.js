(function() {
  'use strict';

  angular
    .module('save-a-selfie.info')
    .controller('Info', Info);

  Info.$inject = ['$window', 'apiUrl'];

  function Info($window, apiUrl) {
    var vm = this;

    vm.open = open;

    function open(site) {
      var number;
      if (site === 'order-of-malta') {
        number = 0;
      } else if (site === 'save-a-selfie') {
        number = 1;
      } else if (site === 'dublin-fire-brigade') {
        number = 2;
      } else if (site === 'code-for-ireland') {
        number = 3;
      }

      $window.open(apiUrl +
        '/wp/wp-content/themes/magazine-child/infoLink.php?button=' +
        number, '_system', 'location=yes');
    }
  }
})();