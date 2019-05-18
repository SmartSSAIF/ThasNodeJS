
const WebSocket = require('ws');
var wss;
var singleton = require('./app/models/singleton').getInstance()

module.exports = function (porta) {
  console.log('aq porta')
  wss = new WebSocket.Server({ port: porta });
  	return webSocket();
}


function atualizaPosicao(msg){
    var inicio = -21.837005;
    var final = -21.837355;
    var constante = 0.0000108571428;
    var delta = final - inicio;
    var posicaoAtual = singleton.getPosicao()
    delta = 3800 / (0.000350)
    console.log('Body ', msg)

    // if (!Object.keys(global.posicoes).includes(req.connection.remoteAddress)) {
    //     global.posicoes[req.connection.remoteAddress] = -21.837005 //Considerando que sempre começa no zero
    // }

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    sql = 'select * from lugares where rfid=\'' + String(msg.tag) + '\''
    genericDAO.execute(sql, function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result && result.length > 0) {
            var percorrido = 0;
            console.log('Velocidade ', result[0])
            console.log("ID ", result[0].id)
            // var sql = 'UPDATE carros SET localizacaoAtual = ? WHERE id=1';
            // if(){
            //     var connection1 = app.config.dbConnection();
            //     var genericDAO1 = new app.app.models.GenericDAO(connection1);
            //     genericDAO1.update({ localizacaoAtual: result[0].id }, { id: 1 }, "carros", function (erroCristiano, resultadoBaldao) {
            //         if (erroCristiano) {
            //             console.log(erroCristiano)
            //         }
            //         console.log('Atualizou')
            //     })
            //     connection1.end()
            // }
            km = ((Math.abs(msg.velocidade) * 247) / 3800) * 0.036
            km = parseFloat(km.toFixed(2));

            if (Object.keys(msg).includes('velocidade') && Object.keys(msg).includes('sentido')) {

                percorrido = Math.abs(msg.velocidade) * 0.000350 / 3800

                if (msg.sentido == 1) {
                    global.posicoes[req.connection.remoteAddress] += percorrido
                }
                else {
                    global.posicoes[req.connection.remoteAddress] -= percorrido
                }
            }
            if (Object.keys(msg).includes('novaTag')) {
                if (msg.novaTag == 1) {
                    console.log('\t\t\t\t\tTrocou tag \n')
                    console.log('Tag: ', msg.tag)
                    singleton.setPosicao(result[0]['lat'])
                    //global.posicoes[req.connection.remoteAddress] = result[0]['lat']

                }
            }
            //NAO ENTENDI NADA
            result[0]['lat'] = global.posicoes[req.connection.remoteAddress]
            r = {
                'lugar': result[0],
                'posicao': (Object.keys(msg).includes('velocidade') && Object.keys(msg).includes('sentido')) ? (msg.sentido == 1 ? 1 * Math.abs(msg.velocidade) : -1 * Math.abs(msg.velocidade)) : 0,
                'velocidade': km
            }
            sendAll(JSON.stringify(r))
            // global.clientezerorpc.invoke("hello", JSON.stringify(r), function (error, res, more) {
            //     console.log(res);
            // });
            // connection.end()
            console.log('Fechou')
            //  res.status(200).send(r);
            // res.status(200).send(result)
        }
    })
    connection.end()

    res.status(200).send(msg);
}

const sendAll = function (message) {
    console.log('SendALl')
    for (var i = 0; i < singleton.getUsuarios().length; i++) {
        console.log(singleton.getUsuarios()[i].readyState,'\t Estado')
        if (singleton.getUsuarios()[i].readyState == 1) {
            console.log('Enviando:' + message)
            singleton.getUsuarios()[i].send(message);
        }
    }
}


function webSocket(){
	console.log("aq wsz")
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    atualizaPosicao(message)
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
