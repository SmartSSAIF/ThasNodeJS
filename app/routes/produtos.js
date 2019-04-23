auth = require('./../controller/auth')

module.exports = function (app) {
    app.get('/produtos',auth.verify, function (req, res) {
        app.app.controller.produtos.get(app, req, res);
    });


    app.post('/produtos', auth.verify,function (req, res) {
        app.app.controller.produtos.post(app, req, res);
    });

    app.delete('/produtos',auth.verify, function (req, res) {
        app.app.controller.produtos.delete(app, req, res);

    });

    app.put('/produtos', auth.verify,function (req, res) {
        app.app.controller.produtos.put(app, req, res);
    });
}
