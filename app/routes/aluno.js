module.exports = function(app) {
	app.get('/aluno', function(req,res){
		app.app.controller.aluno.get(app,req,res);
	}) ;


	app.post('/aluno', function(req,res){
		app.app.controller.aluno.post(app,req,res);
	});

	app.delete('/aluno', function(req, res){
		app.app.controller.aluno.delete(app,req,res);

	});

	app.put('/aluno', function(req,res){
		app.app.controller.aluno.put(app,req,res);
});
}
