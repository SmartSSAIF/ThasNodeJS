module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);

    var query = "call pedidosFinalizados()";
    genericDAO.execute(query, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Servidor indisponível no momento');
        } else {
            console.log("Pedidos finalizados ", result[0])
            res.status(200).send(result[0]);
        }
    });
}
