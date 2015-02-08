angular.module('save-a-selfie.services')
  .factory('MarkersSrvc', function(
    $http,
    apiUrl,
    CsvSrvc
  ) {

    var csvToArray = function (data) {
      return CsvSrvc.parse(data, '\t');
    };

    var arrayToJson = function (data) {
      return data.map(function (element) {
        if (element.length === 7){
          return {
            pic: element[0],
            caption: element[1],
            type: element[2],
            latitude: element[3],
            longitude: element[4],
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
          transformResponse: [csvToArray, arrayToJson]
        };

        return $http(req);
      }
    };
  });
