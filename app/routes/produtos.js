module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        app.app.controller.produtos.get(app, req, res);
    });


    app.post('/produtos', function (req, res) {
        app.app.controller.produtos.post(app, req, res);
    });

    app.delete('/produtos', function (req, res) {
        app.app.controller.produtos.delete(app, req, res);

    });

    app.put('/produtos', function (req, res) {
        app.app.controller.produtos.put(app, req, res);
    });
}
