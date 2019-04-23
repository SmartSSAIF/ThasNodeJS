auth = require('./../controller/auth')

module.exports = function (app) {
    app.get('/pedido',auth.verify, function (req, res) {
        app.app.controller.pedido.get(app, req, res);
    });


    app.post('/pedido',auth.verify, function (req, res) {
        app.app.controller.pedido.post(app, req, res);
    });
    app.post('/testePost',auth.verify, function (req, res) {
        app.app.controller.pedido.testePost(app, req, res);
    });

    app.delete('/pedido',auth.verify,function (req, res) {
        app.app.controller.pedido.delete(app, req, res);

    });

    app.put('/pedido', auth.verify,function (req, res) {
        app.app.controller.pedido.put(app, req, res);
    });
}
