let express            = require('express'),
	app                = express(),
	bodyParser         = require('body-parser'),
	fs 			       = require('fs'),
	rfs 		       = require('rotating-file-stream'),
	morgan             = require('morgan'),
	port               = process.env.PORT || 8080,
	request            = require('request'),
	Q                  = require('q'),
	path               = require('path')
	config             = require('./config.json')
	weatherRoute       = require('./controllers/weather.controller'),
	citiesRoute        = require('./controllers/cities.controller')
	coordinatesRoute   = require('./controllers/coordinates.controller');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// bundle our routes
let apiRoutes = express.Router();

// Serve pandash app
app.use(express.static(__dirname + '/'));

let getFileName = function () {
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

let logDirectory = path.join(__dirname, '../log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
let accessLogStream = rfs(getFileName(), {
  interval: '1d', // rotate daily
  path: logDirectory
});

// creates console log while server is active
app.use(morgan(':err :method :url :response-time :date[clf]', {stream: accessLogStream}));
 
// frontpage request
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, '../index.html'));
});

app.use('/api', weatherRoute);
app.use('/api', citiesRoute);
app.use('/api', coordinatesRoute);

app.use(function(err, req, res, next) {
    console.dir(err);

    //set response error here for morgan module to log
    res.error = err;

    res.status(500).send('error');
});

// Start the server
app.listen(port);
console.log('You got it, Tristan. This server is for Pandash. Found at port:' + port);
