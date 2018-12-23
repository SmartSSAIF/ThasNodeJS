module.exports.get = function (app, req, res) {

        var connection = app.config.dbConnection();
        var genericDAO = new app.app.models.GenericDAO(connection);

        var query = "SELECT * FROM notificacao where (medico = 1 and (? = 1)) or (enfermeiro = 1 and (? = 1)) or (admin = 1 and (? = 1))";
     
        var admin = req.query.admin;
        var medico = req.query.medico;
        var enfermeiro = req.query.enfermeiro;
        var mensagem = req.query.mensagem;
        var dados = req.query.data;

        console.log('admin ', admin);
        console.log('medico ', medico);
        console.log('enfermeiro ', enfermeiro);
        console.log('dados ', dados);
    
        const { Expo } = require('expo-server-sdk');
        let expo = new Expo();
        genericDAO.execute(query, [medico, enfermeiro, admin], function (error, result) {
            console.log("busca notificacoes");
            if (error) {
                console.log("erro")
                console.log(error);
                connection.end();
                return res.send(401).send("Servidor indisponivel");
            } else {
                let messages = [];
                console.log('result ', result);
                for(let user in result){
                    console.log('User ', user);
                    
                    let pushToken = result[user].token;
                    console.log(pushToken);
                    if (!Expo.isExpoPushToken(pushToken)) {
                        console.error(`Push token ${pushToken} is not a valid Expo push token`);
                        continue;
                      }
                    
                      messages.push({
                        to: pushToken,
                        title: 'THAS',
                        sound: 'default',
                        body: mensagem,
                        data: {info : dados},
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
              
                
                 connection.end();
                return res.status(200).send(result);
            }


        });
      


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
                        res.status(500).send("ja cadastrado");
                    } else {
                        connection.end();
                        res.status(200).send(requisicao);
                    }
                });

                
            },
            function () {
                res.status(400).send({
                    admin: 0
                });
            });
    });
}

