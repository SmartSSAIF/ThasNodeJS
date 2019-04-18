var app = require('./config/server.js');




var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
// var options = {
//   key: fs.readFileSync('/home/ubuntu/privkey.pem'),
//   cert: fs.readFileSync('/home/ubuntu/fullchain.pem')
// };

// console.log(options);

// https.createServer(options, app).listen(5000, ()=> console.log("Rodando express com HTTPS") );

app.listen(3001, function () {

  console.log("Rodando express");

});