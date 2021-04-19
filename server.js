const express = require('express');
const http = require('http');
var path = require('path');
var socketIO = require('socket.io');

const app = express();
var server = http.Server(app);
const io = socketIO(server);

let players = [];

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
  });
// Starts the server.
server.listen(5000, function() {
    console.log('Starting server on port 5000');
  });

// Add the WebSocket handlers
io.on('connection', function(socket) {
});

//TEST
setInterval(function() {
    io.sockets.emit('message', 'hi!');
  }, 1000);

setInterval(function() {
  io.sockets.emit('state');
}, 1000 / 60);

//Bei connection
io.on('connection',function(socket){
  socket.on('user_joined', (name) => {
    const player = {
      id: socket.id,
      name: name,
      points: 0
    }

    //add the player to the Array
    players.push(player);
    console.log(name," is now connected")
    console.log(players)
  });

  
  socket.on('disconnect',function(){
  players = [...players.filter(player => player.id !== socket.id)];
  console.log(socket.id + ' is now disconnected');
  console.log(players);
  })
})


