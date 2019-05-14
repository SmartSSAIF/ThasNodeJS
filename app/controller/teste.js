var zerorpc = require("zerorpc");

module.exports.get = function (app, req, res) {
    res.status(200).send({ deubom: 1 });
}



module.exports.post = function (app, req, res) {

    console.log('Teste');
    console.log(req.body);
    // console.log(JSON.parse(req.body.obs))
    var client = new zerorpc.Client();
    client.connect("tcp://0.0.0.0:5858");
    var connection = app.config.dbConnection();
    var genericDAO = new app.app.models.GenericDAO(connection);
    sql = 'select * from lugares where rfid=\''+String(req.body.tag)+'\''
    genericDAO.execute(sql ,function(err,result){
        if(err){
            console.log(err)
            // return res.status(400).send({erro:1})
        }
        if(result && result.length > 0){
        console.log(result[0],"\t teste")
        
        client.invoke("hello",JSON.stringify(result[0]), function (error, res, more) {
            console.log(res);
        });
        client.close()
        console.log('Fechou')
        // res.status(200).send(result)
    }
    })
    connection.end()


    res.status(200).send(req.body);
}