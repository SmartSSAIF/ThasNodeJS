var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var authConfig = require('../../config/auth');
var auth = require('../services/auth');
module.exports.register = function(app, req, res){
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  var {username} = req.body;
  var {password} = req.body;
  // var usuario = requisicao.usuario;
  var aluno;
  var professor;


  try{

   genericDAO.find({usuario: username},"usuario",function(error, result){
    console.log(result.length)
    busca = result.length;
    console.log("busca ", busca)
    if(result.length > 0){
      return res.status(400).send("error: usuario ja existente");
    }
    else {
      if(req.body.aluno == 1){ //Cria aluno
        aluno = {
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone,
          anoinicio: req.body.anoinicio,
          curso: req.body.curso,
          semestre: req.body.semestre,
          bolsista: req.body.bolsista,


        };
        genericDAO.create(aluno,"aluno", function(err, resultado){
          if(error){
            console.log(error);
            return res.status(400).send("erro ao criar aluno");
          }

          var senhaCriptografada = crypto.createHash('md5').update(senha).digest('hex');
          usuario = {
            usuario: usuario,
            senha: senhaCriptografada,
            tipo: 0,
            aluno: 1,
            professor: 0,
            token: "token ",
          }
          genericDAO.create(usuario, "usuario", function(error, result){

            if(error){
              console.log(error);
              return res.status(400).send("erro ao criar usuario");
            }

            return res.send({usuario: usuario.usuario, token: token});
          });

      });
    }
    if(req.body.professor == 1){ //Cria idProfessor
      professor = {
        nome: req.body.professor,
        email: req.body.email,
        telefone: req.body.telefone,
        departamento: req.body.departamento,
        endereco: req.body.endereco,
        admin: 0,

      }
      genericDAO.create(professor,"professor", function(err, resultado){
        if(error){
          console.log(error);
          return res.status(400).send("erro ao criar professor");
        }

        var senhaCriptografada = crypto.createHash('md5').update(senha).digest('hex');
        usuario = {
          usuario: usuario,
          senha: senhaCriptografada,
          tipo: 0,
          aluno: 0,
          professor: 1,
          token: "token ",
        }
        genericDAO.create(usuario, "usuario", function(error, result){

          if(error){
            console.log(error);
            return res.status(400).send("erro ao criar usuario");
          }

          return res.send({usuario: usuario.usuario, token: token});
        });

    });
  }
      }
    });


} catch(err){
  console.log(err);
}




}

module.exports.autenticar = function(app, req, res){

  console.log("autenticar");
  var usuario = req.body.username;
  var senha = req.body.password;
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  genericDAO.find({usuario},"usuario",function(error, result){
    if(error){
      console.log("erro autenticacao");
      console.log(error);
      return res.status(400).send("error: erro ao encontrar usuario");

    }
    console.log("usuario \n", result);
    if(result.length === 0){
      return res.status(400).send("error: usuario inexistente");
    }else {
      result = result[0];

      if(crypto.createHash('md5').update(senha).digest('hex') === result.senha){
        senha = undefined;
        var campoToken = {
          id: result.id,
          admin: result.admin,
        


        };
        let token = auth.generateToken(campoToken);
        result.Autenticacao = token;

        genericDAO.update(result,{id: result.id},"usuario",function(error,result){
          if(error)
            {	console.log(error)
              console.log("erro ao salvar token")}})
        .then(
          function(){
            req.session.autorizado = true;
            req.session.Autenticacao = token;
            req.session.usuario = usuario;
            console.log("req session");
            console.log(req.session);
                    /*
                    res.redirect("")
                    ou nem precisa enviar o token aqui em baixo
                    */
                    res.send({id: result.id,usuario: usuario, Autenticacao: token });
                  }
                  );
      }


      else {
        res.status(400).send("error: senha invalida");
      }
    }

  });


}

module.exports.logout = function(app,req,res){

  req.session.destroy(function(err){
    if(err){
      return res.status(400).send({logout: 0});
    }
    res.send({logout: 1});
  })
}
