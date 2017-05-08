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

	let cityResults = [];

	citiesService.getData(citiesEndpoint)
        .then(function (body) {
            console.log(body);
            for (i = 0; i < (body.predictions).length; i++) {
                cityResult = {
                    name: body.predictions[i].description
                };

                cityResults.push(cityResult);
            }

            console.log(cityResults);

            res.send({cityResults});
        })
        .catch(function (err) {
            next(new Error(err));
        });
}