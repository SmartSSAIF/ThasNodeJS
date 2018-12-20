module.exports = function(app) {
	app.get('/disciplina', function(req,res){
		app.app.controller.disciplinas.get(app,req,res);
	}) ;


	app.post('/disciplina', function(req,res){
		app.app.controller.disciplinas.post(app,req,res);
	});

	app.delete('/disciplina', function(req, res){
		app.app.controller.disciplinas.delete(app,req,res);

	});

	app.put('/disciplina', function(req,res){
		app.app.controller.disciplinas.put(app,req,res);
});
}
