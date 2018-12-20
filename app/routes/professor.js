module.exports = function(app) {
	app.get('/Professor', function(req,res){
		app.app.controller.professor.get(app,req,res);
	}) ;


	app.post('/Professor', function(req,res){
		app.app.controller.professor.post(app,req,res);
	});

	app.delete('/Professor', function(req, res){
		app.app.controller.professor.delete(app,req,res);

	});

	app.put('/Professor', function(req,res){
		app.app.controller.professor.put(app,req,res);
});
}
