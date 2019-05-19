// var client = new zerorpc.Client();
// client.connect("tcp://127.0.0.1:5005");
var request = require("request");



module.exports.put = function (app, req, res) {
    body = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    let statusPedido = body.statusPedido;
    let id = body.id;
    console.log("Id ", { id });
    console.log("Estado ", { statusPedido });
    genericDAO.update({ statusPedido:5 }, { id }, "pedido", function (err, result) {
        if (err) {
            console.log(err)

            return res.status(400).send({ err: 1 });
        }
        var options = { method: 'POST',
        url: 'http://192.168.10.102:3000/confirmaPedido',
        headers: 
         { 'cache-control': 'no-cache',
           Connection: 'keep-alive',
           'content-length': '',
           'accept-encoding': 'gzip, deflate',
           Host: '192.168.10.102:3000',
           'Postman-Token': '2c8c4fbd-1114-4570-b6f5-ea2aa90d6cd9,4761f4a3-2850-494f-b644-e12afcfd638f',
           'Cache-Control': 'no-cache',
           Accept: '/',
           'User-Agent': 'PostmanRuntime/7.11.0' } };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      });
        return res.status(200).send(body);

    })

}

// module.exports.post = function (app, req, res) {
//     console.log('Teste');
//     console.log(req.body);
//     res.status(200).send(req.body);
// }