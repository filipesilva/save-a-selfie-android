(function() {
  angular
    .module('save-a-selfie', [
      'ionic',
      'uiGmapgoogle-maps',
      'ngCordova',
      'save-a-selfie.common',
      'save-a-selfie.layout',
      'save-a-selfie.photo',
      'save-a-selfie.locate',
      'save-a-selfie.info'
    ])
    .run(run);

  run.$inject = ['$ionicPlatform', 'Camera'];

  function run($ionicPlatform, Camera) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      // Warn if came is not available
      if (window.Camera){
        Camera = window.Camera;
      } else {
        console.log('Cordova camera plugin not loaded!');
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }
})();
