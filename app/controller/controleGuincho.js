var request = require('request')
module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}


module.exports.post = function (app, req, res) {

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
           'User-Agent': 'PostmanRuntime/7.11.0' },
           body: {
               estadoGuincho : req.body.sentido
           }
        
        };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      });
    console.log(req.body)
    
    return res.status(200).send(req.body);
}
