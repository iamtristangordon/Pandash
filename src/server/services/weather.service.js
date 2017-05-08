let request = require('request'),
    Q       = require('q');

let weatherService = {};

weatherService.getData = getData;

module.exports = weatherService;

function getData (endpoint) {
    let def = Q.defer();

    request(endpoint, function(err, response, body){
        def.resolve(JSON.parse(body));
    });

    return def.promise;
}