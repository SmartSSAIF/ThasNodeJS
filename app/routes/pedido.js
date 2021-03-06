auth = require('./../controller/auth')

module.exports = function (app) {
    app.get('/pedido',auth.verify, function (req, res) {
        app.app.controller.pedido.get(app, req, res);
    });
    app.get('/pedido/id',/*auth.verify,*/ function (req, res) {
        app.app.controller.pedido.getById(app, req, res);
    });


    app.post('/pedido',auth.verify, function (req, res) {
        app.app.controller.pedido.post(app, req, res);
    });
    // app.post('/pedido',auth.verify, function (req, res) {
    //     app.app.controller.pedido.post(app, req, res);
    // });

    app.delete('/pedido',auth.verify,function (req, res) {
        app.app.controller.pedido.delete(app, req, res);

    });

    app.put('/pedido', auth.verify,function (req, res) {
        app.app.controller.pedido.put(app, req, res);
    });
}
