var zerorpc = require("zerorpc");
var request = require("request");
var notificacao = require('./../../config/notificacao.json')

module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
module.exports.post = function (app, req, res) {

    var options = {
        method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers:
        {
            'Postman-Token': 'de2b3a89-0113-4bb6-b052-11ffd359bc9a',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            Authorization: 'key=AAAArpJIlpQ:APA91bEzVdxHZTC4sJV0Jy4LTvFw_DRZS79Rtkl_oar19rRQ2p4KAdeyDWYviof22roX4fQF3Y-DoneBdM-ONpimyIvO4QTWUOyarewyMJ3ByCfSfV_Q_ObawB0v0e0BgNZnzw7PQfUS'
        },
        body:
        {
            to: notificacao.cristiano,
            collapse_key: 'type_a',
            notification:
            {
                body: 'Um novo pedido realizado',
                title: 'THAS',
                sound: 'default'
            },
            data:
            {
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
                body: 'Body of Your Notification in Data',
                title: 'Title of Your Notification in Title',
                key_1: 'Value for key_1',
                key_2: 'Value for key_2',
                status: 'done',
                screen: '/pedido/135'
            }
        },
        json: true
    };

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    genericDAO.update({statusPedido: 3}, {id: req.body.pedido}, "pedido", function(e,r){
        if(e){
            console.log(e)
        }
    })
    console.log("BOdy ", req.body)
    var acabou = req.body.acabou;
    console.log("Acabou ", acabou)
    if (acabou == 0) {
        options.body.notification = {
            body: 'Um novo pedido foi realizado',
            title: 'THAS',
            sound: 'default'
        }
        options.body.data =   {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            body: 'Body of Your Notification in Data',
            title: 'Title of Your Notification in Title',
            key_1: 'Value for key_1',
            key_2: 'Value for key_2',
            status: 'done',
            screen: '/pedido/'+String(req.body.pedido)
        }
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
    
            console.log(body);
        });

    }
    else {
        options.body.notification = {
            body: 'Seu pedido foi finalizado',
            title: 'THAS',
            sound: 'default'
        }
        options.body.data =   {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            body: 'Body of Your Notification in Data',
            title: 'Title of Your Notification in Title',
            key_1: 'Value for key_1',
            key_2: 'Value for key_2',
            status: 'done',
            screen: '/confirmarPedido/'+String(req.body.pedido)
        }

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
    
            console.log(body);
        });
    
    }


    return res.status(200).send(req.body);
}
