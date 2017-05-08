let express        = require('express'),
    weatherRoute  = express.Router()
    config         = require('../config.json')
    weatherService = require('../services/weather.service');

weatherRoute.get('/weather', weather);

module.exports = weatherRoute;

function weather (req, res, next) {
	//TODO grab lat and lon values from request parameters
	let multi = req.query.multi;

	//if multi has a value, convert to a bool
	multi ? multi = multi.toLowerCase() == 'true': '';

	let lat = req.query.lat || '46.117237';

	let lon = req.query.lon || '-96.628691';

	let units = req.query.units || 'imperial';

	let count = req.query.count || '10';

	const weatherAppId = config.weatherAppId;

	const endpoint = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +  '&lon=' + lon + '&units=' + units + '&appid=' +  weatherAppId;

	const endpointMulti = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat +  '&lon=' + lon + '&cnt=' + count + '&units=' + units + '&appid=' + weatherAppId;

	let months = [
		'January',
		'February',
		'March',
		'April',
		'May', 
		'June',
		'July',
		'August',
		'September',
		'October', 
		'November', 
		'December',
	];

	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	function getFormattedDate(body, getWeekday = false) {
		date = new Date((body.dt) * 1000);

		if (getWeekday) {
			day = date.getDay();

			formattedDate = days[day];

			return formattedDate;
		}

		else {
			month = months[date.getMonth()];

			day = date.getDate();

			formattedDate = month + ' ' + day;

			return formattedDate;
		}
	}

	if (multi === true) {
        weatherService.getData(endpointMulti)
            .then(function (body) {
                weatherReports = [];

                for (i = 0; i < (body.list).length; i++) {
                    let weatherReport = {
                        temp: {
                            min: Math.round(body.list[i].temp.min),
                            max: Math.round(body.list[i].temp.max),
                            now: 0,
                        },
                        description: body.list[i].weather[0].description,
                        icon: body.list[i].weather[0].icon,
                        date: getFormattedDate(body.list[i], true),
                        location: body.city.name,
                    };

                    weatherReports.push(weatherReport);
                }

                weatherReports.shift();

                console.log(weatherReports);

                res.send({weatherReports});                
            })
            .catch(function (err) {
                console.log(err);
                next(new Error(body.message))
            });  
	} 
	else {
        weatherService.getData(endpoint)
			.then(function (body) {
                console.log(body);

                let weatherReport = {
					temp: {
						min: Math.round(body.main.temp_min),
						max: Math.round(body.main.temp_max),
						now: Math.round(body.main.temp)
					},
					description: body.weather[0].description,
					icon: body.weather[0].icon,
					date: getFormattedDate(body),
					location: body.name,
				};

				console.log(weatherReport);

				res.send({weatherReport});
            })
			.catch(function(err) {
                console.log(err);
				next(new Error(body.message))
			});
	}
  
}

function cities (req, res, next) {
    let input = req.query.input || 'Nashville'; 

	let googleApiKey = config.googleApiKey;

	let	citiesEndpoint = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ input + '&types=(cities)&key=' + googleApiKey;

	let cityResults = [];

	weatherService.getData(citiesEndpoint)
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