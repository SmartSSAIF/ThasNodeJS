var auth  = require('./auth');
module.exports.get = function(app, req, res){
  var aluno = req.query.aluno;
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  genericDAO.find({idAluno: aluno},"aluno",function(error, result){
    if(error){
      console.log("erro")
      console.log(error);
    }
    else{
    res.send(result);
  }
});
connection.end();

}

module.exports.getDisciplinas = function(app, req, res){
  var aluno = req.query.aluno;
  var disciplina = req.query.disciplina;
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  genericDAO.find({idAluno: aluno},"aluno",function(error, result){
    if(error){
      console.log("erro")
      console.log(error);
    }
    else{
    res.status(200).send(result);
  }
});
connection.end();

}
module.exports.post = function(app,req,res){

  auth.middleware(app,req,res, function(campoToken){
    auth.verificaAdmin(app,req,res,campoToken, function(campoToken){

      var requisicao = req.body;
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);

      genericDAO.create(requisicao,"aluno", function(error,result){
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
      var aluno = req.header("aluno");
      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);

      genericDAO.delete({idAluno: aluno},"aluno", function(error, result){
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
      genericDAO.update(requisicao, {idAluno: requisicao.idAluno},"aluno",function(error, result){
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
