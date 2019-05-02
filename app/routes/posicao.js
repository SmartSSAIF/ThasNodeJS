const express = require('express');
const router = express.Router();
const controller = require('../controller/teste');
const authService = require('../services/auth');



module.exports = function (app) {
    app.get('/posicao',authService.isOk, function (req, res) {
        app.app.controller.posicao.get(app, req, res);
    });


    app.post('/posicao', function (req, res) {
        app.app.controller.posicao.post(app, req, res);
    });

    app.delete('/posicao', function (req, res) {
        app.app.controller.posicao.delete(app, req, res);

    });

    app.put('/posicao', function (req, res) {
        app.app.controller.posicao.put(app, req, res);
    });
}
