var zerorpc = require("zerorpc");
global._ = require('underscore');

// import Singleton from './../models/singletonCarrosWs';
module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}
module.exports.post = function (app, req, res) {
    var client = new zerorpc.Client();
    var inicio = -21.837005;
    var final = -21.837355;
    var constante = 0.0000108571428;
    var delta = final - inicio;
    delta = 3800 / (0.000350)
    console.log('BOdy ', req.body  )
    var client = new zerorpc.Client();
    if (!Object.keys(global.posicoes).includes(req.connection.remoteAddress)){
        global.posicoes[req.connection.remoteAddress] = -21.837005 //Considerando que sempre começa no zero
    }
    client.connect("tcp://0.0.0.0:5858");
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    sql = 'select * from lugares where rfid=\'' + String(req.body.tag) + '\''
    genericDAO.execute(sql, function (err, result) {
        if (err) {
            console.log(err)
            // return res.status(400).send({erro:1})
        }
        if (result && result.length > 0) {
            // console.log(result[0],"\t teste")
            // console.log('Parametros ', Object.keys(req.body), '\t type', typeof Object.keys(req.body))

            // console.log("Parametro  velocidade", (Object.keys(req.body).includes('velocidade')))
            // req.body.sentido == 1 ? console.log('1') : console.log('2')

          
            
            var percorrido = 0;
            console.log('Velocidade ', req.body.velocidade)
            km = ((Math.abs(req.body.velocidade)*247)/3800)*0.036
            km = parseFloat(km.toFixed(2));

            if (Object.keys(req.body).includes('velocidade') && Object.keys(req.body).includes('sentido')) {

                percorrido = Math.abs(req.body.velocidade)*0.000350/3800
              
                if (req.body.sentido == 1) {
                    global.posicoes[req.connection.remoteAddress] += percorrido
                }
                else {
                    global.posicoes[req.connection.remoteAddress] -= percorrido
                }
            }
            if(Object.keys(req.body).includes('novaTag')){
                if(req.body.novaTag == 1)
                {
                    console.log('\t\t\t\t\tTrocou tag \n')
                    console.log('Tag: ',req.body.tag)
                    global.posicoes[req.connection.remoteAddress] = result[0]['lat']

                }
            }
            // console.log('\t\t\t ',global.posicoes[req.connection.remoteAddress])
 
            result[0]['lat'] =global.posicoes[req.connection.remoteAddress]
            r = {
                'lugar': result[0],
                'posicao': (Object.keys(req.body).includes('velocidade') && Object.keys(req.body).includes('sentido')) ? (req.body.sentido == 1 ? 1 * Math.abs(req.body.velocidade) : -1 * Math.abs(req.body.velocidade)) : 0,
                'velocidade': km
            }
            
            client.invoke("hello", JSON.stringify(r), function (error, res, more) {
                console.log(res);
            });
            client.close()
            console.log('Fechou')
            //  res.status(200).send(r);
            // res.status(200).send(result)
        }
    })
    connection.end()

      res.status(200).send(req.body);
}
