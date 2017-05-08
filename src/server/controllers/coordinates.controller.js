let express            = require('express'),
    coordinatesRoute   = express.Router()
    config             = require('../config.json')
    coordinatesService = require('../services/coordinates.service');

coordinatesRoute.get('/coordinates', coordinates);

module.exports = coordinatesRoute;

function coordinates (req, res, next) {
    let city = req.query.city || 'Nashville, TN';

	let googleApiKey = config.googleApiKey;

	let	coordinatesEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + googleApiKey;

	let cityResults = [];

	citiesService.getData(coordinatesEndpoint)
        .then(function (body) {
            let coordinates = {
			    lat: body.results[0].geometry.location.lat,
			    lon: body.results[0].geometry.location.lng
		    };

            console.log(coordinates);

		    res.send({coordinates});
        })
        .catch(function (err) {
            next(new Error(err));
        });
}