var cn = require('./../../config/dbConnection')();
var db = require('./GenericDAO');
class SingletonCarros {

  constructor() {
    console.log('construtor carro')
    // console.log(typeof cn)
    // console.log(cn.name)
    // var d = db(cn);
    // console.log(typeof d);
    // console.log(d.name)
    // d.read('carro', function(err,res){
    //   console.log(res)
    // })
      this.logs = [];
  }

  get count() {
      return this.logs.length;
  }

  log(message) {
      const timestamp = new Date().toISOString();
      this.logs.push({ message, timestamp });
      console.log(`${timestamp} - ${message}`);
  }
  getCarros(){
    console.log('get carros') ;
     

  //   var dao = new db(cn)
  //   try{
  //   console.log(dao.name)
  //   dao.prototype.read('carro', function(err, res) {
      
  //   })
  // }catch(e){
  //   console.log(e)
  // }
    }
    

}

class Singleton {

constructor() {
  console.log('construtor')
    if (!Singleton.instance) {
        Singleton.instance = new SingletonCarros();
    }
}

getInstance() {
  console.log('get instance')
    return Singleton.instance;
}

}

module.exports = new Singleton();