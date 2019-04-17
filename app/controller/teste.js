module.exports.get = function (app, req, res) {
    res.status(200).send({deubom: 1});
}
module.exports.post = function (app, req, res) {
    console.log('Teste');
    console.log(req.body);
    res.status(200).send(req.body);
}