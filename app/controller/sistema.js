var zerorpc = require("zerorpc");
var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:5005");
module.exports.get = function (app, req, res) {




}
const procuraCaminho = function (car, menor,origem, destino) {
    console.log("before promise")
    return new Promise(function (resolve, reject) {
        console.log('dentro da promise', car);
        client.invoke("pedido", [origem, destino, car], function (error, res, more) {
            console.log('distancia \t', res.length);
            if (res.length < menor.distancia) {
                console.log("dentro log ", car.id);

                menor.carro = car.id;
                menor.distancia = res.length;
            }
            if (error) {

                reject(menor);
            }
            else resolve(menor);
            //Enviar instrucoes pelo python por ter comunicação melhor de objetos
        });
    });
}
const buscaPedido = function(idPedido, genericDAO){
    console.log(idPedido, "\t buscar")
    return new Promise(function(resolve, reject){
        
        genericDAO.find({idPedido: idPedido}, 'pedidoproduto', function(err, res){
            if(err){
                console.log(err);
                reject({});
            }else{
                
                console.log('encontrou ', res);
                resolve(res);
            }
        });
    })
}
module.exports.post = function (app, req, res) {


    var requisicao = req.body;
    var connection = app.config.dbConnection();

    var genericDAO = new app.app.models.GenericDAO(connection);
    console.log('sistema rolando');
    /*
    Procurar os pedidos
    Procurar os carros
    Enviar as instruções para eles
    
    
    */

    /*
        Procura pedidos
    */
   //Ordenar por data
   genericDAO.execute('select * from pedido where statusPedido = 1 order by prioridade desc', function(err, resultado){

    console.log(resultado);
    console.log('\n\n\n\n');
    for(var j in resultado){
        let pedido = resultado[j].id;
        let x = async function procuraPedido(pedido, genericDAO) {
            console.log("chegou");
            const valor = await buscaPedido(pedido, genericDAO);
            console.log('promise final ', valor);
        };
        x(pedido, genericDAO);
       console.log("for");
    }
   });
    genericDAO.find({ estado: true }, 'carros', function (err, result) {
        console.log("buscou");
        if (err) {
            console.log(err);
            console.log("error");
            return res.status(400).send({ erro: 1 });
        } else {
            console.log('carros disponiveis')
            console.log(result);
            // res.status(200).send(result);
            //Fazer logica para selecionar o melhor carro
            // let carroMenorDistancia = 5000;
            // for(let i=0; i< result.length; i++){
            //Chamar o rmi pedido, da posicao atual do carro com a origem do pedido(na verdade, fazer outro metodo para verificar a distancia no python), assim descobrir a menor distancia
            // }
            var menor = {
                carro: 0,
                distancia: 999,
            }

            for (var i = 0; i < result.length; i++) {
                var car = result[i];
                console.log("car\n", car);
               let x = async function procura(car,menor) {
                    const valor = await procuraCaminho(car, menor,'peteca'+car.id,'peteca11');
                    console.log('promise ', valor);
                };
                x(car,menor,'peteca'+car.id,'peteca11');

            }


            /*
                Aqui possui o melhor carro para ocasiao
            */
            console.log(menor);
            return res.status(200).send(menor);
        }
    });
    console.log("fim");
  //  connection.end();
    /*
Ao fim da invocação, 
*Selecionar o melhor veiculo
*Enviar as instruções para o veiculo
* -Logica para acompanhar o veiculo
*/

    //-------------------------------------------------------------------



    //connection.end();
}


module.exports.delete = function (app, req, res) {

}

module.exports.put = function (app, req, res) {

}

module.exports.testePost = function (app, req, res) {
    console.log('Teste');
    console.log(req.body);
    res.status(200).send(req.body);
}