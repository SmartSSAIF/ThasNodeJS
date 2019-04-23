
const WebSocket = require('ws');
var wss;

module.exports = function (porta) {
  console.log('aq')
  wss = new WebSocket.Server({ port: porta });
  	return webSocket();
}
function webSocket(){
	console.log("aq")
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});
}