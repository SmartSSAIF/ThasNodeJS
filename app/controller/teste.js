var zerorpc = require("zerorpc");

module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
module.exports.post = function (app, req, res) {

    console.log('Teste');
    // console.log(req.body);
    // console.log(JSON.parse(req.body.obs))
    // var client = new zerorpc.Client();
    // client.connect("tcp://0.0.0.0:5005");
    // var connection = app.config.dbConnection();
    // var genericDAO = new app.app.models.GenericDAO(connection);
    // sql = 'select * from lugares where rfid=\''+String(req.body.tag)+'\''
    // genericDAO.execute(sql ,function(err,result){
    //     if(err){
    //         console.log(err)
    //         // return res.status(400).send({erro:1})
    //     }
    //     if(result && result.length > 0){
    //     console.log(result[0],"\t teste")

        // client.invoke("buscaCaminhoPorId",[1,4], function (error, resp, more) {

        //     // console.log(resp);
        //     pedido = JSON.parse(replaceAll(resp,"\'","\""))
        //     // console.log('Res ',res)
        //     console.log(pedido)
        //     // for(var i of pedido){
        //     //  
        //     // }
        //     return res.status(200).send(pedido)
        // });
    //     client.close()
    //     console.log('Fechou')
    //     // res.status(200).send(result)
    // }
    // })
    // connection.end()
    var instrucoes = JSON.parse(req.body.inst)
    for(var instrucao of instrucoes){
        if(JSON.stringify(instrucao).includes("node")){

          var enviar = {
                lugar: instrucao.node.lugar,
                rfid: instrucao.node.rfid,
                peso: instrucao.peso,
                distancia: instrucao.distancia
            }
            console.log('e ',enviar)        }
        else {
          console.log('Vem ',instrucao)
  
        }
    }
    return res.status(200).send(req.body);
}
