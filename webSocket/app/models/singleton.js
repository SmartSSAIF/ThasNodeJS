var cn = require('./../../config/dbConnection')();
const util = require('util');

// var ws = require('./webSokcet');
class SingletonClientes {

  constructor() {

    this.clientes = []
    this.logs = [];
    this.requests = []
    console.log('instanciou')

  }

  get count() {
    return this.clientes.length;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ message, timestamp });
    console.log(`${timestamp} - ${message}`);
  }
  getUsuarios() {
    return this.clientes
  }
  addRequest(request) {

    this.requests.push(request)
    console.log('Util -> ', util.inspect(this.requests[this.requests.length - 1].request, { depth: null }));

  }
  removeRequest(request) {

    this.requests.remove(request)
  }
  addUsuario(usuario) {
    console.log('Antes ', this.clientes.length)

    this.clientes.push(usuario)
    console.log('Add ', this.clientes.length)
  }
  removeUsuario(usuario) {


          this.clientes.pop(usuario)



    console.log('Removeu ', this.clientes.length)

  }
  getUsuario(porta) {
    console.log('get carros');

    var connection = cn();

    sql = 'select usuario, porta from usuario where porta=' + porta
    connection.query(sql, function (e, r) {
      if (e) {
        console.log(e)
        return
      }
      // for(var i =0;i<r.length;i++){
      //   console.log(r[i])
      // }
      //   var w = ws(5005)
      return r
    })
  }


}

class Singleton {

  constructor() {
    console.log('construtor')
    if (!Singleton.instance) {
      Singleton.instance = new SingletonClientes();
    }
  }

  getInstance() {
    console.log('get instance')
    return Singleton.instance;
  }

}

module.exports = new Singleton();
