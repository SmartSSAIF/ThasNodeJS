auth = require('./../controller/auth')

module.exports = function (app) {
    app.get('/lugares', auth.verify,function (req, res) {
        app.app.controller.lugares.get(app, req, res);
    });


    app.post('/lugares',auth.verify, function (req, res) {
        app.app.controller.lugares.post(app, req, res);
    });

    app.delete('/lugares', auth.verify,function (req, res) {
        app.app.controller.lugares.delete(app, req, res);

    });

    app.put('/lugares',auth.verify, function (req, res) {
        app.app.controller.lugares.put(app, req, res);
    });
}
