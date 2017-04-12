var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var fs 			 = require('fs');
var rfs = require('rotating-file-stream');
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

var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs(getFileName(), {
  interval: '1d', // rotate daily
  path: logDirectory
})

// creates console log while server is active
app.use(morgan(':err :method :url :response-time :date[clf]', {stream: accessLogStream}));
 
// frontpage request
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'index.html'));
});

var googleApiKey = 'AIzaSyCZ64UEHphVr_ZkbMEwJl69xAkSBhPsjqQ';

var getCity = function (lat, lon) {
	endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon +  '&key=' + googleApiKey;

	request(endpoint, function(err, response, body){
		body = JSON.parse(body);

		var city = body.results[3].formatted_address;

		console.log(city);

		return city;
	})
}

apiRoutes.get('/weather', function(req, res, next) {
	//TODO grab lat and lon values from request parameters
	let multi = req.query.multi || false;

	var lat = req.query.lat || '46.117237';

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

	function getFormattedDate(body) {
		date = new Date((body.dt) * 1000);

		month = months[date.getMonth()];

		day = date.getDate();

		newDate = month + ' ' + day;

		return newDate;
	}

	request(endpoint, function(err, response, body){
		body = JSON.parse(body);

		console.log(body);

		if (body.cod === 200) {

	        var data = {
	        	temp: Math.round(body.main.temp),
	        	description: body.weather[0].description,
	        	icon: body.weather[0].icon,
	        	date: getFormattedDate(body),
	        };

	        console.log(data);

	        res.send({data});
    	}

    	else {
    		next(new Error(body.message))
    	}
    });
  
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
console.log('You got it, Tristan. This server is for doodtristxn. Found at port:' + port);
