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
