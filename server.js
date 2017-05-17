var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, '/client/')));


io.on('connection', function(socket){
    console.log("we have a connection");
    socket.on("new-message", function(msg) {
        console.log(msg);
        io.emit("receive-message", msg);
    })

});

server.listen(8080, process.env.IP,function() {
   var addr = server.address();
   console.log("Chat server listening at", addr.address + ":" + addr.port);
});

