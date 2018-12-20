module.exports = function(app) {
	app.get('/departamento', function(req,res){
		app.app.controller.departamento.get(app,req,res);
	}) ;


	app.post('/departamento', function(req,res){
		app.app.controller.departamento.post(app,req,res);
	});

	app.delete('/departamento', function(req, res){
		app.app.controller.departamento.delete(app,req,res);

	});

	app.put('/departamento', function(req,res){
		app.app.controller.departamento.put(app,req,res);
});
}
