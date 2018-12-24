var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var authConfig = require('../../config/auth');
module.exports.generationToken = function(params = {}){
	return 	 jwt.sign(params,authConfig.secret, {expiresIn: 86400,});

}
module.exports.verify = async function(app, req, res, funcao){
  var token = req.header("Autenticacao");
  console.log(token)
  jwt.verify(token,authConfig.secret, function(error, decoded){

      if(error) {
        console.log(error);
        return res.status(401).send({error: 'Token invalido'})
      }

			funcao(decoded);


  } );

module.exports.converteToken = async function(req, titulo, funcao){
		var token = req.header(titulo);
		jwt.verify(token,authConfig.secret, function(error, decoded){

				if(error) {
					console.log(error);
					return res.status(401).send({error: 'Token invalido'})
				}

			funcao(decoded);

		} );

}
}
module.exports.middleware = function(app,req,res, funcao){
	// if(req.session.autenticado){

	if(true){

		this.verify(app,req,res,funcao);
	}
	else {
		return res.status(400).send({error: 'Nao autenticado'})
	}

}
module.exports.verificaAdmin = function(app, req, res, token, funcaoAdmin, funcaoNormal){
	console.log(token)
	if(token.admin >= 1){
		console.log("é admin OK");
		funcaoAdmin(token);
	}
	else {
		if(funcaoNormal != null)
	funcaoNormal(token);
	}
}
module.exports.verificacao = function(app, req, res, condicao, token, funcaoAdmin, funcaoNormal){
	console.log("verifica")
	if(condicao){

		funcaoAdmin(token);
	}
	else {
	funcaoNormal(token);
	}
}
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiYWRtaW4iOjEsInVuaXZlcnNpZGFkZSI6MSwicHJvZmVzc29yIjoxLCJhbHVubyI6bnVsbCwiaWF0IjoxNTQ0MzAyNzcyLCJleHAiOjE1NDQzODkxNzJ9.Vx5MCBt1E96o7sDfr5Jyfg-lUHLS5STLh_afOp_gn1k
*/
