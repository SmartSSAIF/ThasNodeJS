const express = require('express');
const router = express.Router();
const controller = require('../controller/teste');
const authService = require('../services/auth');



module.exports = function (app) {
    app.get('/carro', function (req, res) {
        app.app.controller.carro.get(app, req, res);
    });


    app.post('/carro', function (req, res) {
        app.app.controller.carro.post(app, req, res);
    });

    app.delete('/carro', function (req, res) {
        app.app.controller.carro.delete(app, req, res);

    });

    app.put('/carro', function (req, res) {
        app.app.controller.carro.put(app, req, res);
    });
}
