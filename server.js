var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));


io.on('connection', function(socket){
    console.log("we have a connection");
    socket.on("new-message", function(msg) {
        console.log(msg);
        io.emit("receive-message", msg);
    })

});

server.listen(process.env.PORT || 5000, process.env.IP || "0.0.0.0",function() {
   console.log("we are connected");
});

