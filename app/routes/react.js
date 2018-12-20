module.exports = function(app) {
	app.get('/react', function(req,res){
      console.log("React react");
     res.status(200).send( {body: "Testando isso aqui"});
	}) ;


	app.post('/react', function(req,res){
    console.log("React Post");

    let body = req.body;

    console.log("Usuario ", body.user.username);
    console.log("Token " ,body.token.value);

    console.log("Terminou");
    res.status(200).send();
	});

	app.delete('/react', function(req, res){


	});

	app.put('/react', function(req,res){

    console.log("Notificacao");

    let expo = require('expo-server-sdk');


    let messages = [];
    var somePushTokens =[]
    somePushTokens.push("QdCRyjL5RJFhw4fd9wxHUS");
    somePushTokens.push("ExponentPushToken[QdCRyjL5RJFhw4fd9wxHUS]");
    for (let pushToken of somePushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }


      messages.push({
        to: pushToken,
        sound: 'default',
        body: 'Notificacao React',
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



   res.status(200).send( {body: "Enviou eu acho"});

});
}
