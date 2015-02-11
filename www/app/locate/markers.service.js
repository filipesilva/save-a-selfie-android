(function() {
  angular.module('save-a-selfie.locate')
    .factory('MarkersSrvc', function(
      $http,
      apiUrl,
      CsvSrvc
    ) {
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
            '/wp-content/themes/magazine-child/getMapData.php',
          transformResponse: [csvToArray, arrayToMarker]
        };
        return $http(req);
      }

      function csvToArray(data) {
        return CsvSrvc.parse(data, '\t');
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
            };
          });
      }
    });
})();
