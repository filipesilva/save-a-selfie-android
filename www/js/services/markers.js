angular.module('save-a-selfie.services')
  .factory('MarkersSrvc', function(
    $http,
    apiUrl,
    CsvSrvc
  ) {

    var csvToArray = function (data) {
      return CsvSrvc.parse(data, '\t');
    };

    var arrayToMarker = function (data) {
      return data.map(function (element, index) {
        if (element.length === 7){
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
        }
      });
    };

    return {
      get: function() {
        var req = {
          method: 'GET',
          url: apiUrl + '/wp-content/themes/magazine-child/getMapData.php',
          transformResponse: [csvToArray, arrayToMarker]
        };

        return $http(req);
      }
    };
  });
