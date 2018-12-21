module.exports = function (app) {
    app.get('/pedido', function (req, res) {
        app.app.controller.pedido.get(app, req, res);
    });


    app.post('/pedido', function (req, res) {
        app.app.controller.pedido.post(app, req, res);
    });

    app.delete('/pedido', function (req, res) {
        app.app.controller.pedido.delete(app, req, res);

    });

    app.put('/pedido', function (req, res) {
        app.app.controller.pedido.put(app, req, res);
    });
}
