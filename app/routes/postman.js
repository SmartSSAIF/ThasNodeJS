module.exports = function(app) {

	app.get('/postman', function(req,res){

		res.send(req.query);
    console.log(req.query);
	});
	app.post('/postman', function(req,res){

		var json = req.body;
    console.log(json);
		res.send(json);
	});
	app.put('/postman', function(req,res){

		var json = req.body;
		console.log(json);
		res.send(json);
	});
}
