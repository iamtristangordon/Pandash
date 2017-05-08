let request = require('request'),
    Q       = require('q');

let citiesService = {};

citiesService.getData = getData;

module.exports = citiesService;

function getData (endpoint) {
    let def = Q.defer();

    request(endpoint, function(err, response, body){
        def.resolve(JSON.parse(body));
    });

    return def.promise;
}