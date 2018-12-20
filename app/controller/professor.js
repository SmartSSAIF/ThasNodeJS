var auth  = require('./auth');


module.exports.get = function(app, req, res){


  auth.middleware(app,req,res, function(campoToken){
    console.log(campoToken)
    // var curso = req.query.curso;

    auth.verificacao(app,req,res, true, campoToken, function(campoToken){
        let id = campoToken.id;
      var universidade = campoToken.universidade;
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);

        var query = "select distinct professor.* from departamento, instituto, professor where  professor.departamento = departamento.idDepartamento and departamento.instituto = "+String(universidade);
       genericDAO.execute(query,function(error, result){
         console.log("busca departamento");
         if(error){
          console.log("erro")
          console.log(error);
        }
        else{


         return  res.status(200).send(result);
       }


   });
       connection.end();


     }, function(){

      res.status(200).send({permissao: 0});
    });


  })



}

module.exports.post = function(app,req,res){

  auth.middleware(app,req,res, function(campoToken){
    auth.verificaAdmin(app,req,res,campoToken, function(campoToken){

      var requisicao = req.body;
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);

      genericDAO.create(requisicao,"professor", function(error,result){
        if(error){
          console.log("erro")
          console.log(error);
        }
        else{
          res.status(200).send(requisicao);
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
      var professor = req.header("professor");
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);

      genericDAO.delete({idProfessor: professor},"professor", function(error, result){
        if(error){
          console.log("erro")
          console.log(error);
        }
        else {
          res.status(200).send({deletado: 1})
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
      genericDAO.update(requisicao, {idProfessor: requisicao.idProfessor},"professor",function(error, result){
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
