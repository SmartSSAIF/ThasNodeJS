var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var authConfig = require('../../config/auth');
var auth = require('./auth');
module.exports.register = function(app, req, res){
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  var {usuario} = req.body;
  var {senha} = req.body;
  // var usuario = requisicao.usuario;

  try{

   genericDAO.find({usuario},"usuario",function(error, result){
    console.log(result.length)
    busca = result.length;
    console.log("busca ", busca)
    if(result.length > 0){
      return res.status(400).send("error: usuario ja existente");
    }
    else {
      var senhaCriptografada = crypto.createHash('md5').update(senha).digest('hex');
      usuario = {
        usuario: usuario,
        senha: senhaCriptografada,
        tipo: 0,
        token: "token ",
      }
      genericDAO.create(usuario, "usuario", function(error, result){

        if(error){
          console.log(error);
        }
        res.send({usuario: usuario.usuario, token: token});
      });
    }
  });
 }  catch(err){
  console.log(err);
}




}
 function trataUsuario(token, bd){
  if(token.professor > 0){
    return  trataProfessor(token.professor,  bd);
  }
  else if(token.aluno > 0){
    return  trataAluno(token.aluno,  bd);
  }
}
function trataAluno(id, bd){
  bd.find({idAluno: id},"aluno", function(err, result){
    if(err) console.log(err);
    var tokenSecundario = {
      curso: result[0].curso,
    }
    return tokenSecundario;
  })

}
function trataProfessor(id, bd){
  bd.find({professor: id},"curso", function(err, result){
    if(err) console.log(err);
    var cursos = [];
    for(let i in result){
      cursos.push(result[i].idCurso);
    }
    var tokenSecundario = {
      cursos: JSON.stringify(cursos),
    }
    return tokenSecundario;
  })
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
          universidade: result.universidade,
          professor: result.professor,
          aluno: result.aluno,


        };
        	let token2 =  auth.generationToken(trataUsuario(campoToken,genericDAO));
          let token = auth.generationToken(campoToken);
          result.Autenticacao = token;

          genericDAO.update(result,{id: result.id},"usuario",function(error,result){
            if(error)
              {	console.log(error)
								console.log("erro ao salvar token")}})
          .then(
            function(){
              req.session.autorizado = true;
              req.session.Autenticacao = token;
							req.session.Autorizacao = token2;
              req.session.usuario = usuario;
              console.log("req session");
              console.log(req.session);
                    /*
                    res.redirect("")
                    ou nem precisa enviar o token aqui em baixo
                    */
                    res.send({id: result.id,usuario: usuario, Autenticacao: token, Autorizacao:token2 });
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
