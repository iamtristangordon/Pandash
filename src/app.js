var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var fs 			 = require('fs');
var rfs 		 = require('rotating-file-stream');
var morgan       = require('morgan');
var port         = process.env.PORT || 8080;
var request      = require('request');
var path         = require('path')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// bundle our routes
var apiRoutes = express.Router();

// Serve pandash app
app.use(express.static(__dirname + '/'));

var getFileName = function () {
	date = new Date();

	month = date.getMonth() + 1;

	day = date.getDate();

	year = date.getFullYear();

	fileName = month + '-' + day + '-' + year + '.log';

	return fileName;
}

//create new morgan token to display error in log
morgan.token('err', function getErr (req) {
  return req.res.error;
});

var logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs(getFileName(), {
  interval: '1d', // rotate daily
  path: logDirectory
});

// creates console log while server is active
app.use(morgan(':err :method :url :response-time :date[clf]', {stream: accessLogStream}));
 
// frontpage request
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'index.html'));
});

apiRoutes.get('/cities', function(req, res, next) {
	let input = req.query.input || 'Nashville'; 

	let googleApiKey = 'AIzaSyDAgDIVzKJ8ubNrJ_LQi4L2teD5TG3FojA';

	let	endpoint = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ input + '&types=(cities)&key=' + googleApiKey;

	console.log(endpoint);

	let cityResults = [];

	request(endpoint, function(err, response, body){
		body = JSON.parse(body);

		console.log(body);

		for (i = 0; i < (body.predictions).length; i++) {
			cityResult = {
				name: body.predictions[i].description
			};

			cityResults.push(cityResult);
		}

		console.log(cityResults);

		res.send({cityResults});
	});

});

apiRoutes.get('/weather', function(req, res, next) {
	//TODO grab lat and lon values from request parameters
	let multi = req.query.multi;

	//if multi has a value, convert it to a boolean value
	multi ? multi = multi.toLowerCase() == 'true': '';

	let lat = req.query.lat || '46.117237';

	let lon = req.query.lon || '-96.628691';

	let units = req.query.units || 'imperial';

	let count = req.query.count || '10';

	let appid = '71d6193f508c6d5107a3f3f92e464c98';

	let endpoint = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +  '&lon=' + lon + '&units=' + units + '&appid=' + appid;

	console.log(endpoint);

	let endpointMulti = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat +  '&lon=' + lon + '&cnt=' + count + '&units=' + units + '&appid=' + appid;

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
		request(endpointMulti, function(err, response, body){
			try {
				body = JSON.parse(body);				
			} catch (e) {
				return console.error(e);
			}

			//console.log(body);

			if (parseInt(body.cod) === 200) {

				weatherReports = [];

				for (i = 0; i < (body.list).length; i++) {
					var weatherReport = {
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
			}

			else {
				next(new Error(body.message))
			}
		});
	} 
	else {
		request(endpoint, function(err, response, body){
			try {
				body = JSON.parse(body);				
			} catch (e) {
				return console.error(e);
			}

			if (parseInt(body.cod) === 200) {

				var weatherReport = {
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
			}

			else {
				next(new Error(body.message))
			}
		});
	}
  
});

app.use('/api', apiRoutes);

app.use(function(err, req, res, next) {
    console.dir(err);

    //set response error here for morgan module to log
    res.error = err;

    res.status(500).send('error');
});

// Start the server
app.listen(port);
console.log('You got it, Tristan. This server is for Pandash. Found at port:' + port);
