var request = require('request')
var notificacao = require('./../../config/notificacao.json')
module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}


module.exports.post = function (app, req, res) {
    console.log('Token ', notificacao.gabriel)
    var options = { method: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: 
     { 'Postman-Token': 'de2b3a89-0113-4bb6-b052-11ffd359bc9a',
       'cache-control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: 'key=AAAArpJIlpQ:APA91bEzVdxHZTC4sJV0Jy4LTvFw_DRZS79Rtkl_oar19rRQ2p4KAdeyDWYviof22roX4fQF3Y-DoneBdM-ONpimyIvO4QTWUOyarewyMJ3ByCfSfV_Q_ObawB0v0e0BgNZnzw7PQfUS' },
    body: 
     { to: notificacao.cristiano,
       collapse_key: 'type_a',
       notification: 
        { body: 'Alerta de bateria!',
          title: 'THAS',
          sound: 'default' },
       data: 
        { click_action: 'FLUTTER_NOTIFICATION_CLICK',
          body: 'Body of Your Notification in Data',
          title: 'Title of Your Notification in Title',
          key_1: 'Value for key_1',
          key_2: 'Value for key_2',
          status: 'done',
          screen: 'home' } },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
    return res.status(200).send(req.body);
}
