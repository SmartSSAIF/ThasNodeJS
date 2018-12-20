module.exports = function(app) {
	app.get('/universidade', function(req,res){
		app.app.controller.universidade.get(app,req,res);
	}) ;


	app.post('/universidade', function(req,res){
		app.app.controller.universidade.post(app,req,res);
	});

	app.delete('/universidade', function(req, res){
		app.app.controller.universidade.delete(app,req,res);

	});

	app.put('/universidade', function(req,res){
		app.app.controller.universidade.put(app,req,res);
});
}
