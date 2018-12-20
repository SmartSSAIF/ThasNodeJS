module.exports = function(app) {
	app.get('/curso', function(req,res){
		app.app.controller.curso.get(app,req,res);
	}) ;


	app.post('/curso', function(req,res){
		app.app.controller.curso.post(app,req,res);
	});

	app.delete('/curso', function(req, res){
		app.app.controller.curso.delete(app,req,res);

	});

	app.put('/curso', function(req,res){
		app.app.controller.curso.put(app,req,res);
});
}
