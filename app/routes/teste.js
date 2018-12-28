const express = require('express');
const router = express.Router();
const controller = require('../controller/teste');
const authService = require('../services/auth');



module.exports = function (app) {
    app.get('/teste',authService.isOk, function (req, res) {
        app.app.controller.teste.get(app, req, res);
    });


    app.post('/teste', function (req, res) {
        app.app.controller.teste.post(app, req, res);
    });

    app.delete('/teste', function (req, res) {
        app.app.controller.teste.delete(app, req, res);

    });

    app.put('/teste', function (req, res) {
        app.app.controller.teste.put(app, req, res);
    });
}
