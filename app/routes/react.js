module.exports = function(app) {
	app.get('/react', function(req,res){
      console.log("React react");
     res.status(200).send( {body: "Testando isso aqui"});
	}) ;


	app.post('/react', function(req,res){
    console.log("React Post");

    let body = req.body;

    let token = body.token.value;
    let user = body.user.username;
    console.log("Usuario ", body.user.username);
    console.log("Token " ,body.token.value);

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);

    var query = "INSERT INTO notificacao (token, nome) values (?,?)";


    genericDAO.execute(query, [token, user], function (error, result) {

      if(error){
        console.log(error);
        res.status(401).send('Servidor ruim');


      }else{

        
      console.log("Terminou");
      res.status(200).send("cadastrado");
      }



    });
 



	});

	app.delete('/react', function(req, res){


	});

	app.put('/react', function(req,res){


});
}
