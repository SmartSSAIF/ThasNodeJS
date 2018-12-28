module.exports.get = function (app, req, res) {

    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);

    var query = "call produtos()";
    genericDAO.execute(query, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Servidor indisponível no momento');
        } else {
            res.status(200).send(result[0]);
        }
    });
}
module.exports.post = function(app,req,res){
    var requisicao = req.body;
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);

    genericDAO.create(requisicao, "produtos", function (error, result) {
      if (error) {
        console.log("erro")
        console.log(error);
        return res.status(400).send({produto: 0});
      }
      else {
       return  res.status(200).send({produto: 1});
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
    let produto = {
        id: requisicao.idProduto,
        nome: requisicao.nome,
        lugar: requisicao.lugar,
        nomeLugar: requisicao.nomeLugar,
    }
    genericDAO.update(produto, { id: requisicao.idProduto }, "produtos", function (error, result) {
      if (error) {
        console.log("erro")
        console.log(error);
        return res.status(400).send({ atualizado: 0 });
      }
      res.send({ atualizado: 1 })
    });

    connection.end();

}

module.exports.delete = function(app,req,res){
    var produto = req.body.idProduto;

      var connection = app.config.dbConnection();
      var genericDAO = new app.app.models.GenericDAO(connection);
      genericDAO.delete({ id: produto }, "produtos", function (error, result) {
        if (error) {
          console.log("erro")
          console.log(error);
        }
        else {
          res.send({ deletado: 1 })
        }

      });
      connection.end();
}
