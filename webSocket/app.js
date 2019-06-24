

var singleton = require('./app/models/singleton').getInstance()
var zerorpc = require("zerorpc");
var flag = 0;
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 5050 })


wss.on('connection', function (ws) {
    singleton.addUsuario(ws)
    ws.on('message', function (message) {
        console.log('received: %s', message);
        // sendAll(message);
        if (flag) {
            
            flag = 0
            console.log(flag)
        }
    });
    ws.on('close', function close(valor) {
        console.log(valor)
        for (var cliente in singleton.getUsuarios()) {

            if (singleton.getUsuarios()[cliente].readyState == 3) {//3 - Closed
                singleton.getUsuarios()[cliente].terminate();
                singleton.removeUsuario(cliente)
                console.log('disconnected');
            }
        }

    });
    // ws.send("NEW USER JOINED");
});

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

var server = new zerorpc.Server({
    hello: function (name, reply) {
        flag = 1
        console.log('Invocacao Remota ', name)
        sendAll(name)

        reply(null, "Hello, " + name);

    }
});

server.bind("tcp://0.0.0.0:5858");

