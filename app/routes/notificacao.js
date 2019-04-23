auth = require('./../controller/auth')

module.exports = function(app) {
	app.get('/notificacao', auth.verify,function(req,res){
     app.app.controller.notificacao.get(app, req, res);
	}) ;


	app.post('/notificacao', auth.verify,function(req,res){
    console.log("React Post");

    console.log(req.body);

    res.status(200).send();
	});

	app.delete('/notificacao',auth.verify, function(req, res){


	});

	app.put('/notificacao',auth.verify, function(req,res){

});
}
