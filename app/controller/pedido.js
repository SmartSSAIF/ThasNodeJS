// var client = new zerorpc.Client();
// client.connect("tcp://127.0.0.1:5005");
var request = require("request");

module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);


    genericDAO.execute("select distinct pedidoproduto.idPedido,pedido.data, pedido.observacoes, pedidoproduto.origem, pedidoproduto.destino, pedido.statusPedido from pedido, pedidoproduto where  pedido.id = pedidoproduto.idPedido and statusPedido  = 3  ", function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send('Servidor indisponível no momento');
        } else {
            genericDAO.read('lugares', function (err, lugares) {


                var dict = []; // create an empty array
                for (var j = 0; j < lugares.length; j++) {
                    dict.push({
                        key: lugares[j].id,
                        value: lugares[j].nome
                    });
                }
                for (var i = 0; i < result.length; i++) {
                    console.log("Id ", result[i].idPedido)
                    result[i].origem = dict[result[i].origem].value;
                    result[i].destino = dict[result[i].destino].value
                    sql = "select distinct pedidoproduto.idProduto,produtos.nome from produtos, pedido, pedidoproduto where pedidoproduto.idProduto = produtos.id and pedidoproduto.idPedido = " + result[i].idPedido;
                    console.log(sql)
                    genericDAO.execute(sql, function (e, r) {
                        if (e) {
                            console.log(e)
                            return
                        }
                        //Junta os valores
                    });

                }
                return res.status(200).send(result);
            })

        }

    });



}
module.exports.getById = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    sql = "select distinct pedidoproduto.idPedido, pedido.statusPedido, pedido.prioridade, pedido.observacoes, l1.nome origem, l2.nome destino  	from (lugares, pedido , pedidoproduto    join lugares l1 on pedidoproduto.origem = l1.id join lugares l2 on pedidoproduto.destino = l2.id) where pedidoproduto.idPedido = ? and pedido.id = ?;"
    //sql = "select distinct pedidoproduto.idPedido,pedido.data, pedido.observacoes, pedidoproduto.origem, pedidoproduto.destino, pedido.statusPedido from pedido, pedidoproduto where  pedido.id = pedidoproduto.idPedido and pedido.id = "+String(req.query.id)
    genericDAO.execute(sql, [req.query.id, req.query.id], function (error, result) {
        if (error) {
            console.log(error)
            // return res.status(400).send({'error': 'Erro ao buscar pedido por id'})
        }
        console.log('Result ', result)
        return res.status(200).send(result)
    })


}

module.exports.post = function (app, req, res) {

    //SELECT * FROM Table ORDER BY ID DESC LIMIT 1
    console.log("POST")
    var requisicao = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    var pedidos = [];


    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let hora = date.getHours();
    let min = date.getMinutes()
    var dataFinal = ano + "-" + mes + "-" + dia + "\t" + hora + ":" + min;
    let data = {
        data: dataFinal,
        statusPedido: 1,
        prioridade: requisicao.prioridade,
        observacoes: requisicao.observacoes
    }
    console.log('create \n', data)
    genericDAO.create(data, "pedido", function (error, resultado) {
        if (!error) {
            console.log("Resultado do create ", resultado)
            var idInserido = resultado[1][0]['last_insert_id()'];
            console.log("Id inserido ", idInserido)
            /*
                    1 - Esperando FILA
                    2 - Buscando
                    3 - Aguardando confirmação
                    7 - Confirmado
                    4 - Levando 
                    5 - Finalizado
                    6 - Cancelado
            */

            var insert = "INSERT INTO pedidoproduto (idProduto, idpedido, origem, destino) values (?,?,?,?);"
            genericDAO.execute(insert, [3, parseInt(idInserido), parseInt(requisicao.origem), parseInt(requisicao.destino)], (e, result) => {

                if (e) {
                    console.log(e);
                    return res.status(400).send({ cadastraPedido: 0 });
                }
                return res.status(200).send({ cadastraPedido: 1 });
            });

        } else {
            console.log(error);
            return res.status(500).send(error);
        }
    });

    //connection.end();
}


module.exports.delete = function (app, req, res) {
}

module.exports.put = function (app, req, res) {
    body = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    let statusPedido = body.statusPedido;
    let id = body.id;
    console.log("Id ", { id });
    console.log("Estado ", { statusPedido });
    genericDAO.update({ statusPedido }, { id }, "pedido", function (err, result) {
        if (err) {
            console.log(err)

            return res.status(400).send({ err: 1 });
        }
        var options = {
            method: 'POST',
            url: 'http://192.168.10.102:3000/confirmaPedido',
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'content-length': '',
                'accept-encoding': 'gzip, deflate',
                Host: '192.168.10.102:3000',
                'Postman-Token': '2c8c4fbd-1114-4570-b6f5-ea2aa90d6cd9,4761f4a3-2850-494f-b644-e12afcfd638f',
                'Cache-Control': 'no-cache',
                Accept: '/',
                'User-Agent': 'PostmanRuntime/7.11.0'
            }
        };

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