(function() {
  angular
    .module('save-a-selfie.locate')
    .factory('markers', markers);

  markers.$inject = ['$http', 'apiUrl', 'csv'];

  function markers($http, apiUrl, csv) {

    // members
    var service = {
      get: get
    };
    return service;

    // functions

    function get(argument) {
      var req = {
        method: 'GET',
        url: apiUrl +
          '/wp/wp-content/themes/magazine-child/getMapData.php',
        transformResponse: [csvToArray, arrayToMarker]
      };
      return $http(req);
    }

    function csvToArray(data) {
      return csv.parse(data, '\t');
    }

    function arrayToMarker(data) {
      return data.filter(function(element) {
          if (element.length === 7) {
            return true;
          } else {
            return false;
          }
        })
        .map(function(element, index) {
          var icons = [
            'img/defibrillator-marker-icon.png',
            'img/life-ring-marker-icon.png',
            'img/first-aid-kit-marker-icon.png',
            'img/hydrant-marker-icon.png',
          ];
          return {
            id: index,
            coords: {
              latitude: parseFloat(element[3]),
              longitude: parseFloat(element[4])
            },
            image: element[0],
            caption: element[1],
            type: element[2],
            thumb: element[5],
            source: element[6],
            options: {
              icon: {
                anchor: {
                  x: 20,
                  y: 20
                },
                url: icons[element[2]]
              }
            },
          };
        });
    }
  }
})();
