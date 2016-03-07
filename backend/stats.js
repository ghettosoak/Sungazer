var http = require('http'),
	express = require('express'),
	os = require('os'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	app = express();

	app.use(cors());

	var server = app.listen(7000, 'localhost', function () {

		var host = server.address().address;
		var port = server.address().port;

		console.log('Hello from http://%s:%s', host, port);
	});

	app.use(express.static('public'));

	app.use(bodyParser.json())

	app.use(bodyParser.urlencoded({ 
	  extended: true
	}));

	app.all('/*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.send({
			loadavg: os.loadavg(),
			freemem: os.freemem(),
			totalmem: os.totalmem(),
			uptime: os.uptime()
		});

		next();
	});