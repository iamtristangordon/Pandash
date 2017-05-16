let request = require('request'),
    Q       = require('q');

let coordinatesService = {};

coordinatesService.getData = getData;

module.exports = coordinatesService;

function getData (endpoint) {
    let def = Q.defer();

    request(endpoint, function(err, response, body){
        def.resolve(body);
    });

    return def.promise;
}