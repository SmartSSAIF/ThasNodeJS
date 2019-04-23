// var client = new zerorpc.Client();
// client.connect("tcp://127.0.0.1:5005");
module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);


    genericDAO.read("pedido", function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send('Servidor indisponível no momento');
        } else {
            return res.status(200).send(result[0]);
        }

    });



}

// module.exports.post = function (app, req, res) {

//     //SELECT * FROM Table ORDER BY ID DESC LIMIT 1

//     var requisicao = req.body;
//     var connection = app.config.dbConnection();
//     var genericDAO = new app.app.models.GenericDAO(connection);
//     var pedidos = [];


//     let date = new Date();
//     let dia = date.getDate();
//     let mes = date.getMonth() + 1;
//     let ano = date.getFullYear();
//     let hora = date.getHours();
//     let min = date.getMinutes()
//     var dataFinal = ano + "-" + mes + "-" + dia + "\t" + hora + ":" + min;
//     let data = {
//         data: dataFinal,
//         statusPedido: 1,
//         prioridade: requisicao.prioridade
//     }
//     genericDAO.create(data, "pedido", function (error, resultado) {
//         if (!error) {
//             var query = "SELECT * FROM pedido ORDER BY id DESC LIMIT 1";
//             //COlocar por exemplo 1- esperando 2 - executando 3- finalizado 4- cancelado

//             genericDAO.execute(query, null, (err, result) => {
//                 console.log("pedidresulto produto")
//                 if (err) {
//                     result
//                     console.log(err);
//                     return res.staresulttus(400).send({ criarPedido: 0 });
//                 }

//                 //for (let i in requisicao.produtos) { //pq o pedidos ta em vetor?
//                 if (true) {

//                     console.log(result);
//                     console.log('Result [0] ', result[0]);
//                     var insert = "INSERT INTO pedidoproduto (idproduto, idpedido, origem, destino) values (?,?,?,?);"
//                     genericDAO.execute(insert, [parseInt(requisicao.produtos), parseInt(result[0].id), parseInt(requisicao.origem), parseInt(requisicao.destino)], (e, result) => {

//                         if (e) {
//                             console.log(e);
//                             return res.status(400).send({ cadastraPedido: 0 });
//                         }
//                         return res.status(200).send({ cadastraPedido: 1 });
//                     });
//                 }
//             });
//     //----------------------------------------------------------------
//             genericDAO.find({estado: true}, 'carros', function(err, result){
//                 if(err){
//                     console.log(err);
//                 }
//                 console.log('carros disponiveis')
//                 console.log(result);
//                 //Fazer logica para selecionar o melhor carro
//                 // let carroMenorDistancia = 5000;
//                 // for(let i=0; i< result.length; i++){
//                 //Chamar o rmi pedido, da posicao atual do carro com a origem do pedido(na verdade, fazer outro metodo para verificar a distancia no python), assim descobrir a menor distancia
//                 // }
//                 client.invoke("pedido", ['peteca1','peteca11', result[0].id], function (error, res, more) {
//                     console.log(res);
//                     //.
//                     //Enviar instrucoes pelo python por ter comunicação melhor de objetos
//                 });
//             });
//               /*
//     Ao fim da invocação, 
//         *Selecionar o melhor veiculo
//         *Enviar as instruções para o veiculo
//         * -Logica para acompanhar o veiculo
//     */

//     //-------------------------------------------------------------------
        
//         } else {
//             console.log(error);
//             return res.status(500).send(error);
//         }
//     });

//     //connection.end();
// }


module.exports.delete = function (app, req, res) {
}

module.exports.put = function (app, req, res) {
    body = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    let estado = body.estado;
    let id = body.id;
    console.log("Id ", {id});
    console.log("Estado ", {estado});
    genericDAO.update({estado}, {id},"pedido", function(err, result){
        if (err){
            console.log(err)
            return res.status(400).send({err: 1});
        }
        return res.status(200).send(body);

    })

}

module.exports.post = function (app, req, res) {
        console.log('Teste');
        console.log(req.body);
        res.status(200).send(req.body);
}