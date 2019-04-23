var cn = require('./../../config/dbConnection')();
var ws = require('./webSocket');
class SingletonCarros {

  constructor() {
    console.log('construtor carro')
    console.log(typeof cn)
    console.log(cn.name)
   
   
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
     
    var connection = cn();

 
    connection.query('select * from carros', function(e,r){
      if(e){
        console.log(e)
        return
      }
      // for(var i =0;i<r.length;i++){
      //   console.log(r[i])
      // }
      var w = ws(5005)
    })
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