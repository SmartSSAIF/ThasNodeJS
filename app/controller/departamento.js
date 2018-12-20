var auth  = require('./auth');


module.exports.get = function(app, req, res){


  auth.middleware(app,req,res, function(campoToken){
    console.log(campoToken)
    // var curso = req.query.curso;

    auth.verificacao(app,req,res, true, campoToken, function(campoToken){
      console.log(campoToken);

      let id = campoToken.id;
      var universidade = campoToken.universidade;
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);
      console.log("peteca");
      //genericDAO.find({curso: curso},"disciplina",function(error, result){
       genericDAO.find({instituto: universidade},"departamento",function(error, result){
         console.log("busca departamento");
         if(error){
          console.log("erro")
          console.log(error);
        }
        else{


         return  res.send(result);
       }
     });
       connection.end();


     }, function(){
    
      res.send({permissao: 0});
    });


  })



}

module.exports.post = function(app,req,res){

  auth.middleware(app,req,res, function(campoToken){
    auth.verificaAdmin(app,req,res,campoToken, function(campoToken){

      var requisicao = req.body;
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);

      genericDAO.create(requisicao,"departamento", function(error,result){
        if(error){
          console.log("erro")
          console.log(error);
        }
        else{
          res.send(requisicao);
        }
      });

      connection.end();
    },
    function(){
      res.status(400).send({admin: 0});
    });
  });
}


module.exports.delete = function(app,req,res){

  auth.middleware(app,req,res, function(campoToken){
    auth.verificaAdmin(app,req,res, function(campoToken){
      var departamento = req.header("departamento");
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);

      genericDAO.delete({idDepartamento: departamento},"departamento", function(error, result){
        if(error){
          console.log("erro")
          console.log(error);
        }
        else {
          res.send({deletado: 1})
        }

      });



  //res.send(requisicao);
  connection.end();
},
function(campoToken){
  res.status(400).send({admin: 0})
});
  });
}

module.exports.put = function(app,req,res){
  auth.middleware(app,req,res, function(){
    auth.verificacao(app,req,res, true, campoToken, function(campoToken){
      var requisicao = req.body;
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);
      console.log("update");
      genericDAO.update(requisicao, {idDepartamento: requisicao.idDepartamento},"departamento",function(error, result){
        if(error){
          console.log("erro")
          console.log(error);
        }
      });

      connection.end();
    },
    function(campoToken){

    });
  });
}
