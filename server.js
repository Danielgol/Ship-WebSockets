
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];
var connections = [];

server.listen(process.env.PORT || 3000);

console.log("Your server is running...");

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/public/game.html');
});

io.sockets.on('connection', function(socket){

  connections.push(socket);
  console.log('New Connection: '+socket.id);

  //New user
  socket.on('new user', function(data){
  	console.log('User %s: '+data.name, connections.length);
    users.push(data);
    sendUsers();
  });

  //Disconnect
  socket.on('disconnect', function(data){
  	users.splice(connections.indexOf(socket), 1);
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
    sendUsers();
  });

  //Send ship to others
  socket.on('ship', function(data){
    socket.broadcast.emit('ship', data);
  });

  //Increase points
  socket.on('increase points', function(data){
  	console.log('Increase score of: '+data);
  	for(i=0; i<users.length; i++){
  		if(users[i].name === data){
  			users[i].points += 1;
  			break;
  		}
  	}
  	sendUsers();
  });

  function sendUsers(){
  	io.sockets.emit('users', users);
  }
  
});
