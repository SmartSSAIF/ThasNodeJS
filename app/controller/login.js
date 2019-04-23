var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var authConfig = require('../../config/auth');
var auth = require('../services/auth');
var session = require('express-session');
var flash = require('connect-flash');
var helmet = require('helmet');

const validaCampos = function (usuario) {
  var erros = [];
  console.log('validando')
  if (isEmpty(usuario.usuario)) {
    erros.push("Usuario invalido");
  }
  if (isEmpty(usuario.senha)) {
    erros.push("Senha invalida");
  }
  return erros;

}
const isEmpty = function (campo) {
  return campo.length < 2;
}
const buscaUsuario = async function (bd, usuario) {
  return new Promise(function (resolve, reject) {
    bd.find({ usuario }, "usuario", function (error, result) {
      if (error) {
        console.log(error);
        reject({ usuario: 404 })

      }
      console.log("usuario ", result)
      resolve(result)
    })
  })
}
const validaUsuario = function (usuarioBanco, usuarioRequisicao) {
  console.log(usuarioBanco)
  console.log('tamanho ', usuarioBanco.length)
  if (usuarioBanco.length > 0) {
    usuarioBanco = usuarioBanco[0];


    if (validaSenha(usuarioBanco.senha, usuarioRequisicao.senha)) {
      return true;
    }
    else {
      return false;
    }
  } else {
    return false;
  }
}
const token = async function (usuario) {
  if (usuario.length > 0) {
    usuario = usuario[0]
    var t = {
      id: usuario.id,
      usuario: usuario.usuario,
      nivel: usuario.nivel
    }

    var token = await auth.generateToken(t)
    return { token }
  }

}
const validaSenha = function (senhaBanco, senha) {
  return crypto.createHash('md5').update(senha).digest('hex') == senhaBanco
}
module.exports.autenticar = function (app, req, res) {

  var requisicao = req.body;
  console.log(requisicao)

  var validacao = validaCampos(req.body);
  console.log(validacao)
  if (validacao.length > 0) {
    return res.status(405).send({ login: validacao })
  }
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  let f = async function (genericDAO, usuario) {
    return await buscaUsuario(genericDAO, usuario)
  }
  f(genericDAO, requisicao.usuario).then(function (usuario) {
    if (validaUsuario(usuario, requisicao)) {
      console.log("usuario validado")
      let tokenFunction = async function (usuario) {
        return await token(usuario);
      }
      tokenFunction(usuario).then(function (tkn) {
        // res.header('token', tkn.token);
        console.log(usuario)
        s = {
          'token': tkn.token,
          'usuario':usuario[0].usuario,
          'email': usuario[0].email,
          'id': usuario[0].id,
          'notificacao': usuario[0].token
        }
        return res.status(200).send(s)
      })

    } else {
      return res.status(400).send({ usuario: 'invalido' })
    }

  })



}

module.exports.logout = function (app, req, res) {

  req.session.destroy(function (err) {
    if (err) {
      return res.status(400).send({ logout: 0 });
    }
    res.send({ logout: 1 });
  })
}
