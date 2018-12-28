module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);

    var query = "select * from lugares";
    genericDAO.execute(query, function (error, result) {
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
    /*
    Fazer logica conectando com o python, ou seja, add a parte de sentido,
    e quando add, atualizar o grafo 
    faça o mesmo para o delete
    
    
    */
    genericDAO.create(requisicao, "lugares", function (error, result) {
      if (error) {
        console.log("erro")
        console.log(error);
        return res.status(500).send({lugar: 0});
      }
      else {
       return  res.status(200).send({lugar: 1});
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
    var lugar  = {
       
        nome: requisicao.nome
    }
    genericDAO.update(lugar, { id: requisicao.idLugar }, "lugares", function (error, result) {
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
    var lugar = req.body.idLugar;

      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);
      genericDAO.delete({ id: lugar }, "lugares", function (error, result) {
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
