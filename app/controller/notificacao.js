module.exports.get = function (app, req, res) {

        var connection = app.config.dbConnection();
        var genericDAO = new app.app.models.GenericDAO(connection);

        var query = "SELECT * FROM notificacao where (medico = 1 and (? = 1)) or (enfermeiro = 1 and (? = 1)) or (admin = 1 and (? = 1))";
     
        var admin = req.query.admin;
        var medico = req.query.medico;
        var enfermeiro = req.query.enfermeiro;
        var mensagem = req.query.mensagem;



        console.log('admin ', admin);
        console.log('medico ', medico);
        console.log('enfermeiro ', enfermeiro);
    
        const { Expo } = require('expo-server-sdk');
        let expo = new Expo();
        genericDAO.execute(query, [medico, enfermeiro, admin], function (error, result) {
            console.log("busca notificacoes");
            if (error) {
                console.log("erro")
                console.log(error);
                return res.send(401).send("Servidor indisponivel");
            } else {
                for(let user in result){
                    let pushToken = user.token;
                    if (!Expo.isExpoPushToken(pushToken)) {
                        console.error(`Push token ${pushToken} is not a valid Expo push token`);
                        continue;
                      }
              
                      messages.push({
                        to: pushToken,
                        sound: 'default',
                        body: mensagem,
                        data: { withSome: 'data' },
                      })
                    }
              
                    let chunks = expo.chunkPushNotifications(messages);
                    let tickets = [];
                    (async () => {
              
                      for (let chunk of chunks) {
                        try {
                          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                          console.log(ticketChunk);
                          tickets.push(...ticketChunk);
              
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    })();              
                    let receiptIds = [];
                    for (let ticket of tickets) {
              
                      if (ticket.id) {
                        receiptIds.push(ticket.id);
                      }
                    }
              
                    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
                    (async () => {
              
                      for (let chunk of receiptIdChunks) {
                        try {
                          let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                          console.log(receipts);
              
              
                          for (let receipt of receipts) {
                            if (receipt.status === 'ok') {
                              continue;
                            } else if (receipt.status === 'error') {
                              console.error(`There was an error sending a notification: ${receipt.message}`);
                              if (receipt.details && receipt.details.error) {
              
                                console.error(`The error code is ${receipt.details.error}`);
                              }
                            }
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    })();
              
                

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