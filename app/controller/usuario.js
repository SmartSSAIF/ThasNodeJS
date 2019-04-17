module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    console.log("GET - Usuario")
    
    genericDAO.read("usuario", function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Servidor indisponível no momento');
        } else {
            res.status(200).send(result);
        }
    });
}
module.exports.post = function(app,req,res){
    var requisicao = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
 
    genericDAO.create(requisicao, "usuario", function (error, result) {
      if (error) {
        console.log("erro")
        console.log(error);
        return res.status(500).send({usuario: 0});
      }
      else {
       return  res.status(200).send({usuario: 1});
      }
    });

    connection.end();

}
module.exports.put = function(app,req,res){
    var requisicao = req.body;
    console.log(requisicao)
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    console.log("update");
    var usuario  = {
       
        token: requisicao.token
    }
    genericDAO.update(usuario, { id: requisicao.id }, "usuario", function (error, result) {
      if (error) {
        console.log("erro")
        console.log(error);
        return res.status(500).send({ atualizado: 0 });
      }
      res.status(200).send({ atualizado: 1 })
    });

    connection.end();

}

module.exports.delete = function(app,req,res){
    var usuario = req.body.id;

      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);
      genericDAO.delete({ id: usuario.id }, "usuario", function (error, result) {
        if (error) {
          console.log("erro")
          console.log(error);
          res.status(500).send({ deletado: 0 })
        }
        else {
          res.status(200).send({ deletado: 1 })
        }

      });
      connection.end();
}
