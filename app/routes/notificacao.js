module.exports = function(app) {
	app.get('/notificacao', function(req,res){
     app.app.controller.notificacao.get(app, req, res);
	}) ;


	app.post('/notificacao', function(req,res){
    console.log("React Post");

    console.log(req.body);

    res.status(200).send();
	});

	app.delete('/notificacao', function(req, res){


	});

	app.put('/notificacao', function(req,res){

});
}
