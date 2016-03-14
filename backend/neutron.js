// var http = require('http'),

var http = require('http'),
	express = require('express'),
	os = require('os'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	app = express();

	ports = [7000, 7010, 7011],

	servers = {};

// ports.forEach(function(port) {
	// var s = http.createServer(reqHandler);

	var app = express();

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

	// switch(port){
	// 	case 7000:
			app.get('/stats', function(req, res, next) {
				console.log('STATS')
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
		// break;
		// case 7010:
			app.post('/youtube', function(req, res, next) {
				console.log('YOUTUBE')

				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "X-Requested-With");
				
				res.send({yeah: 'yeah!'})

				next();
			});
		// break;
		// case 7011:
			// app.post('/*', function(req, res, next) {
			// 	res.header("Access-Control-Allow-Origin", "*");
			// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
			// 	res.send({
			// 		loadavg: os.loadavg(),
			// 		freemem: os.freemem(),
			// 		totalmem: os.totalmem(),
			// 		uptime: os.uptime()
			// 	});

			// 	next();
			// });
	// 	break;
	// }


// });

// servers[7006].all('/*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.send({
// 		loadavg: os.loadavg(),
// 		freemem: os.freemem(),
// 		totalmem: os.totalmem(),
// 		uptime: os.uptime()
// 	});

// 	next();
// });

// console.log(servers)
// servers[]