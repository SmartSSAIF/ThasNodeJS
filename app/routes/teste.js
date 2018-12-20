module.exports = function(app) {
	app.get('/teste', function(req,res){
		console.log("teste");
		var varTeste = req.query.teste;
		var connection = app.config.dbConnection();
		var generic = new app.app.models.GenericDAO(connection);
		try {
				let instituto = {
					nome: "if sula",
					endereco: 2,


				};
				generic.create(instituto,"instituto", function(error, result){
					if(error)
						console.log(error);
					else console.log("ok");

				});

				generic.read('instituto',function(erro,result){
					console.log(result);
				});

				generic.find({idEndereco: 2},'endereco',function(erro, result){
					console.log(">>")
					if(erro)
						console.log(erro)
					else console.log(result);

				});
				let novoEndereco = {
					idEndereco: 2,
					rua: 'boboes',
					numero: 362,
					bairro: 'bairro2',
					cidade: 'peteca'
				};

				// generic.update(novoEndereco,'idEndereco', 2,'endereco',function(erro,result){
				// 	if(erro)
				// 		console.log(erro);
				// });
					generic.update(novoEndereco,{idEndereco: 2},'endereco',function(erro,result){
					if(erro)
						console.log(erro);
				})
		}catch(erro){
			console.log("que porra é val");
			console.log(erro);
		}

		res.send("recebido");

	}) ;

}
