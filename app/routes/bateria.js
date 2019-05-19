const express = require('express');
const router = express.Router();
const controller = require('../controller/teste');
const authService = require('../services/auth');



module.exports = function (app) {
    app.get('/bateria', function (req, res) {
        app.app.controller.bateria.get(app, req, res);
    });


    app.post('/bateria', function (req, res) {
        app.app.controller.bateria.post(app, req, res);
    });

    app.delete('/bateria', function (req, res) {
        app.app.controller.bateria.delete(app, req, res);

    });

    app.put('/bateria', function (req, res) {
        app.app.controller.bateria.put(app, req, res);
    });
}
