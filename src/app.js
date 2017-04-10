var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var morgan       = require('morgan');
var port         = process.env.PORT || 8080;
var request      = require('request');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// bundle our routes
var apiRoutes = express.Router();
 
// creates console log while server is active
app.use(morgan('dev'));

// Serve pandash app
app.use(express.static(__dirname + '/'));

console.log(__dirname);
 
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

apiRoutes.get('/weather', function(req, res) {
	var lat = '36.117237';

	let lon = '-86.628691';

	let units = 'imperial';

	let appid = '71d6193f508c6d5107a3f3f92e464c98';;

	var endpoint = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +  '&lon=' + lon + '&units=' + units + '&appid=' + appid;

	request(endpoint, function(err, response, body){
		body = JSON.parse(body);

        var data = {
        	temp: Math.round(body.main.temp),
        	description: body.weather[0].description,
        };

        console.log(data);

        res.send({data});
    });
  
});

app.use('/api', apiRoutes);

// Start the server
app.listen(port);
console.log('You got it, Tristan. This server is for doodtristxn. Found at port:' + port);
