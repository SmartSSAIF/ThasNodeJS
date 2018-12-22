module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);

    var query = "call produtos()";
    genericDAO.execute(query, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Servidor indisponível no momento');
        } else {
            res.status(200).send(result);
        }

    });

    

}   

module.exports.post = function (app, req, res) {

    //SELECT * FROM Table ORDER BY ID DESC LIMIT 1

    var requisicao = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    var pedidos = [];

    genericDAO.create(requisicao, "pedido", function (error, result) {
        if (!error) {
            var query = "SELECT * FROM pedidoproduto ORDER BY ID DESC LIMIT 1";
            genericDAO.execute(query, (error, result) => {
                for (let i in pedidos) {
                    console.log("i ", i);
                    console.log(result);
                    console.log('Result [0] ', result[0]);
                    var insert = "INSERT INTO pedidoproduto (idproduto, idpedido) values (?,?);"
                    genericDAO.execute(insert, [i.id, result[0].id], (error, result) => {

                    });
                }
                res.status(200).send("sei la");
            });

        } else {
            console.log(error);
            res.status(500).send(error);
        }
    });

    connection.end();
}


module.exports.delete = function (app, req, res) {

}

module.exports.put = function (app, req, res) {

}