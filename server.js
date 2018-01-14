
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
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/public/views/game.html');
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
    io.sockets.emit('erase all');
    sendUsers();
  });

  //Send ship to others
  socket.on('ship', function(data){
    socket.broadcast.emit('ship', data);
  });

  //Erase ship
  socket.on('erase my ship', function(data){
    io.sockets.emit('erase ship', {x: data.x, y: data.y});
  });

  //Erase shot in borders
  socket.on('erase my shot', function(data){
    socket.broadcast.emit('erase shot', {x: data.x, y: data.y});
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
    var ranking = users.slice();
    ranking.sort(function(a,b){
      if(a.points > b.points)return -1;
      if(a.points < b.points)return 1;
    });
  	io.sockets.emit('ranking', ranking);
  }
  
});
