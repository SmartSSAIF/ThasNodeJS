module.exports.get = function (app, req, res) {

  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);

  var query = "select carros.*, e.descricao from carros join estados e on carros.estado=e.id;";
  genericDAO.execute(query, function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).send('Servidor indisponível no momento');
    } else {
      res.status(200).send(result);
    }
  });
}
module.exports.post = function (app, req, res) {
  var requisicao = req.body;
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);

  genericDAO.create(requisicao, "carros", function (error, result) {
    if (error) {
      console.log("erro")
      console.log(error);
      return res.status(500).send({
        lugar: 0
      });
    } else {
      return res.status(200).send({
        lugar: 1
      });
    }
  });

  connection.end();

}
module.exports.put = function (app, req, res) {
  var requisicao = req.body;
  console.log(requisicao)
  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  console.log("update");
  var sql = 'select id from lugares where rfid =' + String(req.body.localizacaoAtual)
  genericDAO.execute(sql, function (err, resultado) {
    print("REsultado carro linha 43 ", resultado)
    var carro = {
      ip: req.body.ip,
      estado: req.body.estado,
      localizacaoAtual: resultado,
    }
    genericDAO.update(carro, {
      id: requisicao.id
    }, "carros", function (error, result) {
      if (error) {
        console.log("erro")
        console.log(error);
        return res.status(500).send({
          atualizado: 0
        });
      }
      res.status(200).send({
        atualizado: 1
      })
    });

    connection.end();
  })


}

module.exports.delete = function (app, req, res) {
  var lugar = req.body.idLugar;

  var connection = app.config.dbConnection();
  var genericDAO = new app.app.models.GenericDAO(connection);
  genericDAO.delete({
    id: lugar
  }, "lugares", function (error, result) {
    if (error) {
      console.log("erro")
      console.log(error);
      res.status(500).send({
        deletado: 0
      })
    } else {
      res.status(200).send({
        deletado: 1
      })
    }

  });
  connection.end();
}