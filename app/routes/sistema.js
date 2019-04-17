module.exports = function (app) {
    app.get('/sistema', function (req, res) {
        app.app.controller.sistema.get(app, req, res);
    });


    app.post('/sistema', function (req, res) {
        app.app.controller.sistema.post(app, req, res);
    });


    app.delete('/sistema', function (req, res) {
        app.app.controller.sistema.delete(app, req, res);

    });

    app.put('/sistema', function (req, res) {
        app.app.controller.sistema.put(app, req, res);
    });
}
