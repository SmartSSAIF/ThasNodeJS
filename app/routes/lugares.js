module.exports = function (app) {
    app.get('/lugares', function (req, res) {
        app.app.controller.lugares.get(app, req, res);
    });


    app.post('/lugares', function (req, res) {
        app.app.controller.lugares.post(app, req, res);
    });

    app.delete('/lugares', function (req, res) {
        app.app.controller.lugares.delete(app, req, res);

    });

    app.put('/lugares', function (req, res) {
        app.app.controller.lugares.put(app, req, res);
    });
}
