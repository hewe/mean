var http = require("http");
var path = require('path');
var express = require("express");
var app = express(); // express() is a function that is exported above and it returns an object that can handle req and responses


// setup view engine to be vash. Express is smart that prepaths any views used for render() is inside a views folder
app.set("view engine", "vash");

// set the public static resources folder
app.use(express.static(path.resolve(__dirname, 'public')));


var controllers = require("./controllers");
controllers.init(app);

// // setup view engine to be jade
// app.set("view engine", "jade");

// app.get("/", function(req, res) {
//   res.render("jade/index", {title : "Express + Jade"});
// });


// app.get("/", function(req, res){
//   res.send("<html><body><h1>Express</h1></body></html>")
// });

// creats a http server
var server = http.createServer(app);

// send json back for /api/users route
app.get("/api/users", function(req, res) {
    res.set("Content-Type", "application/json");
    res.send({name : "Weiping", isValid: true, group: "Admin"})
});

// creates the listenner for the server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

// this is a single response for all request web server, not production
// var server = http.createServer(function(req, res) {
//     console.log(req.url);
//     res.write("<html><body><h1>" + req.url + "</h1></body></html>");
//     res.end();
// })




// //
// // # SimpleServer
// //
// // A simple chat server using Socket.IO, Express, and Async.
// //
// var http = require('http');
// var path = require('path');

// var async = require('async');
// var socketio = require('socket.io');
// var express = require('express');

// //
// // ## SimpleServer `SimpleServer(obj)`
// //
// // Creates a new instance of SimpleServer with the following options:
// //  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
// //
// var router = express();
// var server = http.createServer(router);
// var io = socketio.listen(server);

// router.use(express.static(path.resolve(__dirname, 'client')));
// var messages = [];
// var sockets = [];

// io.on('connection', function (socket) {
//     messages.forEach(function (data) {
//       socket.emit('message', data);
//     });

//     sockets.push(socket);

//     socket.on('disconnect', function () {
//       sockets.splice(sockets.indexOf(socket), 1);
//       updateRoster();
//     });

//     socket.on('message', function (msg) {
//       var text = String(msg || '');

//       if (!text)
//         return;

//       socket.get('name', function (err, name) {
//         var data = {
//           name: name,
//           text: text
//         };

//         broadcast('message', data);
//         messages.push(data);
//       });
//     });

//     socket.on('identify', function (name) {
//       socket.set('name', String(name || 'Anonymous'), function (err) {
//         updateRoster();
//       });
//     });
//   });

// function updateRoster() {
//   async.map(
//     sockets,
//     function (socket, callback) {
//       socket.get('name', callback);
//     },
//     function (err, names) {
//       broadcast('roster', names);
//     }
//   );
// }

// function broadcast(event, data) {
//   sockets.forEach(function (socket) {
//     socket.emit(event, data);
//   });
// }

// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = server.address();
//   console.log("Chat server listening at", addr.address + ":" + addr.port);
// });
