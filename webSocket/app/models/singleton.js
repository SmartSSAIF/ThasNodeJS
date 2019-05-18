var cn = require('./../../config/dbConnection')();
const util = require('util');

// var ws = require('./webSokcet');
class SingletonClientes {

  constructor() {

    this.clientes = []
    this.logs = [];
    this.requests = []
    this.posicao = -21.837005
    console.log('instanciou')

  }

  getPosicao(){
    return this.posicao
  }
 
  setPosicao(valor){
    this.posicao = valor
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
