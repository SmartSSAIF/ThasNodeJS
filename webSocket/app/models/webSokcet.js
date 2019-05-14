
const WebSocket = require('ws');
var wss;

module.exports = function (porta) {
  console.log('aq porta')
  wss = new WebSocket.Server({ port: porta });
  	return webSocket();
}
function webSocket(){
	console.log("aq wsz")
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
}
module.exports = function(porta){
var WebSocketServer = require('websocket').server;
var singleton = require('./singleton').getInstance()
var http = require('http');
class webSocket {
    constructor(porta) {
        
        console.log('Construtor ',porta)
        this.server = http.createServer(function (request, response) {
            console.log((new Date()) + ' Received request for ' + request.url);
            response.writeHead(404);
            response.end();
        });
        this.server.listen(porta, function () {
            console.log((new Date()) + ' Server is listening on port ' + porta);
        });

       
    }
    start(obs){
        this.wsServer = new WebSocketServer({
            httpServer: this.server,
            autoAcceptConnections: false
        });
        var srv = this.server;
        
        this.wsServer.on('request', function (request) {
            
            var originIsAllowed = function(request){
                console.log('Funcao')
                //console.log(request)
                return true;
            }
        
            if (!originIsAllowed(request)) {
                // Make sure we only accept requests from an allowed origin
                request.reject();
                console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                return;
            }
        
           var  connection = request.accept('echo-protocol', request.origin);
           singleton.addUsuario(connection)
           singleton.addRequest(request)
            console.log((new Date()) + ' Connection accepted.');
            connection.on('message', function (message) {

                console.log('Type ', message.type)
                if (message.type === 'utf8') {
                    console.log(obs)
                    obs ++;
                    connection.sendUTF(message.utf8Data+String(obs));
                }
                else if (message.type === 'binary') {
                    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                    connection.sendBytes(message.binaryDx.wsServer.connection.sendUTF('foi'))

                }
            });
            connection.on('close', function (reasonCode, description) {
                singleton.removeUsuario(connection)
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            });
        });
       

    }
  
    
}

module.exports  = webSocket;








