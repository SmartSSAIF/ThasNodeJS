const express = require('express');
const router = express.Router();
const controller = require('../controller/teste');
const authService = require('../services/auth');



module.exports = function (app) {
    app.get('/finalizarPedido',authService.isOk, function (req, res) {
        app.app.controller.finalizarPedido.get(app, req, res);
    });


    app.post('/finalizarPedido', function (req, res) {
        app.app.controller.finalizarPedido.post(app, req, res);
    });

    app.delete('/finalizarPedido', function (req, res) {
        app.app.controller.finalizarPedido.delete(app, req, res);

    });

    app.put('/finalizarPedido', function (req, res) {
        app.app.controller.finalizarPedido.put(app, req, res);
    });
}
