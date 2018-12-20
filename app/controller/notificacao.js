module.exports.get = function (app, req, res) {

        var connection = app.config.dbConnection();
        var genericDAO = new app.app.models.GenericDAO(connection);

        var query = "SELECT * FROM notificacao where (medico = 1 and (? = 1)) or (enfermeiro = 1 and (? = 1)) or (admin = 1 and (? = 1))";
     
        var admin = req.get('admin');
        var medico = req.get('medico');
        var enfermeiro = req.get('enfermeiro');


        console.log('admin ', admin);
        console.log('medico ', medico);
        console.log('enfermeiro ', enfermeiro);
        genericDAO.execute(query, [medico, enfermeiro, admin], function (error, result) {
            console.log("busca notificacoes");
            if (error) {
                console.log("erro")
                console.log(error);
            } else {
                return res.status(200).send(result);
            }


        });
        connection.end();


}

module.exports.post = function (app, req, res) {

    auth.middleware(app, req, res, function (campoToken) {
        auth.verificaAdmin(app, req, res, campoToken, function (campoToken) {

                var requisicao = req.body;
                var connection = app.config.dbConnection();
                var genericDAO = new app.app.models.GenericDAO(connection);

                genericDAO.create(requisicao, "professor", function (error, result) {
                    if (error) {
                        console.log("erro")
                        console.log(error);
                    } else {
                        res.status(200).send(requisicao);
                    }
                });

                connection.end();
            },
            function () {
                res.status(400).send({
                    admin: 0
                });
            });
    });
}


module.exports.delete = function (app, req, res) {

    auth.middleware(app, req, res, function (campoToken) {
        auth.verificaAdmin(app, req, res, campoToken, function (campoToken) {
                var professor = req.header("professor");
                var connection = app.config.dbConnection();
                var genericDAO = new app.app.models.GenericDAO(connection);

                genericDAO.delete({
                    idProfessor: professor
                }, "professor", function (error, result) {
                    if (error) {
                        console.log("erro")
                        console.log(error);
                    } else {
                        res.status(200).send({
                            deletado: 1
                        })
                    }

                });



                //res.send(requisicao);
                connection.end();
            },
            function (campoToken) {
                res.status(400).send({
                    admin: 0
                })
            });
    });
}

module.exports.put = function (app, req, res) {
    auth.middleware(app, req, res, function () {
        auth.verificacao(app, req, res, true, req.header("Autenticacao"), function (campoToken) {
                var requisicao = req.body;
                var connection = app.config.dbConnection();
                var genericDAO = new app.app.models.GenericDAO(connection);
                console.log("update");
                genericDAO.update(requisicao, {
                    idProfessor: requisicao.idProfessor
                }, "professor", function (error, result) {
                    if (error) {
                        console.log("erro")
                        console.log(error);
                    } else {
                        res.send({
                            atualizado: 1
                        })
                    }
                });

                connection.end();
            },
            function (campoToken) {

            });
    });
}