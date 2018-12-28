var zerorpc = require("zerorpc");
var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:5005");
module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);


    genericDAO.read("pedido", function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Servidor indisponível no momento');
        } else {
            res.status(200).send(result[0]);
        }

    });



}

module.exports.post = function (app, req, res) {

    //SELECT * FROM Table ORDER BY ID DESC LIMIT 1

    var requisicao = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    var pedidos = [];




    console.log("invoke");
    client.invoke("pedido", ['peteca1','peteca11'], function (error, res, more) {
        console.log(res);
    });

    /*
    Ao fim da invocação, 
        *Selecionar o melhor veiculo
        *Enviar as instruções para o veiculo
        * -Logica para acompanhar o veiculo
    */
    console.log("fim invoke");


    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let hora = date.getHours();
    let min = date.getMinutes()
    var dataFinal = ano + "-" + mes + "-" + dia + "\t" + hora + ":" + min;
    let data = {
        data: dataFinal
    }
    genericDAO.create(data, "pedido", function (error, resultado) {
        if (!error) {
            var query = "SELECT * FROM pedido ORDER BY id DESC LIMIT 1";
            genericDAO.execute(query, null, (err, result) => {
                console.log("pedidresulto produto")
                if (err) {
                    result
                    console.log(err);
                    return res.staresulttus(400).send({ criarPedido: 0 });
                }

                //for (let i in requisicao.produtos) { //pq o pedidos ta em vetor?
                if (true) {

                    console.log(result);
                    console.log('Result [0] ', result[0]);
                    var insert = "INSERT INTO pedidoproduto (idproduto, idpedido, origem, destino) values (?,?,?,?);"
                    genericDAO.execute(insert, [parseInt(requisicao.produtos), parseInt(result[0].id), parseInt(requisicao.origem), parseInt(requisicao.destino)], (e, result) => {

                        if (e) {
                            console.log(e);
                            return res.status(400).send({ cadastraPedido: 0 });
                        }
                        return res.status(200).send({ cadastraPedido: 1 });
                    });
                }
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

}