// var zerorpc = require("zerorpc");
// var client = new zerorpc.Client();
// var http = require("http");
// var jpickle = require('jpickle');

// client.connect("tcp://127.0.0.1:5005");

// module.exports.get = function (app, req, res) {
//     console.log("Get")
//     client.invoke("pedido", ['peteca1','peteca10', '0'], function(err, r){
//         if(err){
//             console.log(err)
//             return res.status(400).send({erro: 1});
//         }
//         console.log(r);
//        // var x = jpickle.loads(r);
//           return res.status(200).send(r);
       
        
//     })


// }
// const procuraCaminho = function (car, menor, origem, destino) {
//     return new Promise(function (resolve, reject) {
//         client.invoke("pedido", [origem, destino, car], function (error, res, more) {
//             if (res.length < menor.distancia) {

//                 menor.carro = car.id;
//                 menor.distancia = res.length;
//             }
//             if (error) {

//                 reject(menor);
//             }
//             else resolve(menor);
//             //Enviar instrucoes pelo python por ter comunicação melhor de objetos
//         });
//     });
// }
// const buscaPedido = function (idPedido, genericDAO) {
//     return new Promise(function (resolve, reject) {

//         genericDAO.find({ idPedido: idPedido }, 'pedidoproduto', function (err, res) {
//             if (err) {
//                 console.log(err);
//                 reject({});
//             } else {
//                 resolve(res);
//             }
//         });
//     })
// }
// const updatePedido = function (pedido, genericDAO) { //mudar estado do pedido
//     return new Promise(function (resolve, reject) {
//         let idPedido = pedido.idPedido;
//         let estado = !pedido.estado;
//         genericDAO.update({estado},{idPedido}, 'pedidoproduto', function (err, res) {
//             if (err) {
//                 console.log(err);
//                 reject({});
//             } else {
//                 resolve({update: 1});
//             }
//         });
//     })
// }
// const updateCarro = function (carro, genericDAO) { //mudar estado do pedido
//     return new Promise(function (resolve, reject) {
//         let idCarro = carro.idCarro;
//         let estado = carro.estado;
//         genericDAO.update({estado},{idCarro}, 'pedidoproduto', function (err, res) {
//             if (err) {
//                 console.log(err);
//                 reject({});
//             } else {
//                 resolve({update: 1});
//             }
//         });
//     })
// }
// const loopFor = function (menor, vetor) {
//     return new Promise(function (resolve, reject) {

//         for (var i = 0; i < vetor.length; i++) {
//             var car = vetor[i];
//             let x = async function procura(car, menor) {
//                 const valor = await procuraCaminho(car, menor, 'peteca' + car.id, 'peteca11');


//             };
//             x(car, menor, 'peteca' + car.id, 'peteca11');
//         }
//         console.log('fim for ', menor);
//         if (menor.distancia < 999) {

//             resolve(menor);
//         }
//         else {
//             reject({ carro: -1, distancia: -999 });
//         }

//     });
// }
// const jsonConcat = function (o1, o2) {
//     for (var key in o2) {
//         o1[key] = o2[key];
//     }
//     return o1;
// }
// module.exports.post = function (app, req, res) {


//     var requisicao = req.body;
//     var connection = app.config.dbConnection();
//     var genericDAO = new app.app.models.GenericDAO(connection);
//     try {
//         genericDAO.execute('select * from pedido where statusPedido = 1 order by prioridade desc', function (err, resultado) {
//             if(err){
//                 console.log(err);
//                 return res.status(400).send({erro:1});
//             }
//             for (var j in resultado) {
//                 let pedido = resultado[j].id;
//                 let x = async function procuraPedido(pedido, genericDAO) {
//                     //Selecionar o melhor pedido
//                     const valor = await buscaPedido(pedido, genericDAO);
//                     return valor;
//                 };
//                 x(pedido, genericDAO).then(valor => {
//                     console.log('after promise ', valor)
//                     genericDAO.find({ estado: true }, 'carros', function (err, resp) {
//                         if (err) {
//                             console.log(err);
//                             console.log("error");
//                             return res.status(400).send({ erro: 1 });
//                         } else {
//                             if (valor.length > 0 && resp.length > 0) {

//                                 var output = jsonConcat(resp[0], valor[0])
//                                 console.log('saida ', output);
    
//                                 /*
//                                     Enviar comando para o carrinho,  pegar ip do carrinho
//                                     Alterar estado pedido e carro
//                                 */
//                                var options = {
//                                 hostname: '127.0.0.1', //pegar ip
//                                 port: 3000,
//                                 path: '/teste',
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                 }
//                             };
//                             var reqCarro = http.request(options, function (res) {
//                                 // console.log('Status: ' + res.statusCode);
//                                 // console.log('Headers: ' + JSON.stringify(res.headers));
//                                 res.setEncoding('utf8');
//                                 res.on('data', function (body) {
//                                     console.log('Body: ' + body);
//                                 });
//                             });
    
//                             reqCarro.write(JSON.stringify(output));
//                             reqCarro.end();

//                                // return res.status(200).send(output);
//                             }
    
//                             // console.log(result);
//                             // res.status(200).send(result);
//                             //Fazer logica para selecionar o melhor carro
//                             // let carroMenorDistancia = 5000;
//                             // for(let i=0; i< result.length; i++){
//                             //Chamar o rmi pedido, da posicao atual do carro com a origem do pedido(na verdade, fazer outro metodo para verificar a distancia no python), assim descobrir a menor distancia
//                             // }
//                             //     var menor = {
//                             //         carro: 0,
//                             //         distancia: 999,
//                             //     }
//                             //     let resFor = async function loop(menor, result){
//                             //         const buscaCarro = await loopFor(menor, result);
//                             //         // console.log('fim promise ', buscaCarro );
//                             //     }
//                             //     resFor(menor, result);
//                             // }
    
//                             /*
//                                 Aqui possui o melhor carro para ocasiao
//                             */
//                             // console.log(menor);
//                             //return res.status(200).send(resp[0]);
    
//                         }
    
//                     });
    
    
    
//                 });
    
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }


// }




// //  connection.end();
// /*
// Ao fim da invocação, 
// *Selecionar o melhor veiculo
// *Enviar as instruções para o veiculo
// * -Logica para acompanhar o veiculo
// */

// //-------------------------------------------------------------------



// //connection.end();


// module.exports.delete = function (app, req, res) {

// }

// module.exports.put = function (app, req, res) {

// }

