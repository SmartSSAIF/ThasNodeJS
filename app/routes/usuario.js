auth = require('./../controller/auth')
module.exports = function (app) {
    app.get('/usuario',auth.verify, function (req, res) {
        app.app.controller.usuario.get(app, req, res);
    });


    app.post('/usuario', function (req, res) {
        app.app.controller.usuario.post(app, req, res);
    });

    app.delete('/usuario', function (req, res) {
        app.app.controller.usuario.delete(app, req, res);

    });

    app.put('/usuario', function (req, res) {
        app.app.controller.usuario.put(app, req, res);
    });
}