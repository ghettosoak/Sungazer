// var http = require('http');

// http.createServer(function(req, res){
//     res.writeHead(200, {'content-type': 'text/plain'});
//     res.end('It works');
// })

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(6543, function(){
  console.log('listening on *:6543');
});