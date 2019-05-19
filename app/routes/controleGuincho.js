const express = require('express');
const router = express.Router();
const controller = require('../controller/teste');
const authService = require('../services/auth');



module.exports = function (app) {
    app.get('/controleGuincho',authService.isOk, function (req, res) {
        app.app.controller.controleGuincho.get(app, req, res);
    });


    app.post('/controleGuincho', function (req, res) {
        app.app.controller.controleGuincho.post(app, req, res);
    });

    app.delete('/controleGuincho', function (req, res) {
        app.app.controller.controleGuincho.delete(app, req, res);

    });

    app.put('/controleGuincho', function (req, res) {
        app.app.controller.controleGuincho.put(app, req, res);
    });
}
