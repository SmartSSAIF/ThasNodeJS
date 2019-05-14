var zerorpc = require("zerorpc");

// import Singleton from './../models/singletonCarrosWs';
module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}
module.exports.post = function (app, req, res) {
    var client = new zerorpc.Client();
    var inicio = -21.837005;
    var final = -21.837355;
    console.log('Body ', req.body)
    var client = new zerorpc.Client();
    client.connect("tcp://0.0.0.0:5858");
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    sql = 'select * from lugares where rfid=\''+String(req.body.tag)+'\''
    genericDAO.execute(sql ,function(err,result){
        if(err){
            console.log(err)
            // return res.status(400).send({erro:1})
        }
        if(result && result.length > 0){
        // console.log(result[0],"\t teste")
        console.log('Parametros ', Object.keys(req.body))
        console.log("Parametro  velocidade",( 'velocidade' in Object.keys(req.body)))
        r = {
            'lugar': result[0],
            'velocidade':( 'velocidade' in Object.keys(req.body)) ? req.body.velocidade : 0
        }
        console.log("Velocidade, ",r )
        client.invoke("hello",JSON.stringify(r), function (error, res, more) {
            console.log(res);
        });
        client.close()
        console.log('Fechou')
        // res.status(200).send(result)
    }
    })
    connection.end()

   return res.status(200).send(req.body);
}
