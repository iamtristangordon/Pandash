let express        = require('express'),
    citiesRoute  = express.Router()
    config         = require('../config.json')
    citiesService = require('../services/cities.service');

citiesRoute.get('/cities', cities);

module.exports = citiesRoute;

function cities (req, res, next) {
    let input = req.query.input || 'Nashville'; 

	let googleApiKey = config.googleApiKey;

	let	citiesEndpoint = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ input + '&types=(cities)&key=' + googleApiKey;

	citiesService.getData(citiesEndpoint)
        .then(function (body) {
            body = JSON.parse(body);

            citiesResults = [];

            citiesResp = body.predictions;

            citiesResp.forEach(function(item){
                cityResult = {
                    name: item.description
                };

                citiesResults.push(cityResult);
            })

            console.log(citiesResults);

            res.send({citiesResults});
        })
        .catch(function (err) {
            console.log(err);

            next(new Error(err));
        });
}