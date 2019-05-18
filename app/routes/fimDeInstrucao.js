const express = require('express');
const router = express.Router();
const controller = require('../controller/teste');
const authService = require('../services/auth');



module.exports = function (app) {
    app.get('/fimDeInstrucao',authService.isOk, function (req, res) {
        app.app.controller.fimDeInstrucao.get(app, req, res);
    });


    app.post('/fimDeInstrucao', function (req, res) {
        app.app.controller.fimDeInstrucao.post(app, req, res);
    });

    app.delete('/fimDeInstrucao', function (req, res) {
        app.app.controller.fimDeInstrucao.delete(app, req, res);

    });

    app.put('/fimDeInstrucao', function (req, res) {
        app.app.controller.fimDeInstrucao.put(app, req, res);
    });
}
