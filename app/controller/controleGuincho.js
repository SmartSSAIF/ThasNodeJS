var request = require('request')
module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}


module.exports.post = function (app, req, res) {

  console.log("Body ", req.body);

  var options = { method: 'POST',
    url: 'http://192.168.10.102:3000/controleGuincho',
    headers: 
     { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       'content-length': '15',
       'accept-encoding': 'gzip, deflate',
       Host: '192.168.10.102:3000',
       'Postman-Token': '2235c137-f4ae-464d-94f9-b3a750a8850d,e5322b1e-435a-40f7-aead-f48cb2b218f7',
       'Cache-Control': 'no-cache',
       Accept: '*/*',
       'User-Agent': 'PostmanRuntime/7.11.0',
       'Content-Type': 'application/x-www-form-urlencoded' },
    form: { estadoGuincho: req.body.sentido } };
  
  request(options, function (error, response, body) { 
    if (error) throw new Error(error);
  
    console.log(body);
  });
  
    return res.status(200).send(req.body);
}
