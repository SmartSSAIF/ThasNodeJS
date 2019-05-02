var zerorpc = require("zerorpc");

// import Singleton from './../models/singletonCarrosWs';
module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}
module.exports.post = function (app, req, res) {
    var client = new zerorpc.Client();
    var inicio = -21.837005;
    var final = -21.837355;
    client.connect("tcp://127.0.0.1:5858");

    client.invoke("broadcast_resp", JSON.stringify(req.body), function (error, res, more) {
        console.log(res);
    });
    console.log('bicao ', s.getRequests().length)
    console.log('Teste');
    console.log(req.body);
    s.sendAll("Ola mundo")
    res.status(200).send(req.body);
}
