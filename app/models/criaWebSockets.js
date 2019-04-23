
const connection = require('./../../config/dbConnection')
const generic = require('./GenericDAO')

module.exports = function (porta) {
   	return criaWebSockets();
}
function criaWebSockets(){
  console.log('chegou')
  var genericDAO = new generic(connection)
  console.log(typeof genericDAO)
  
  genericDAO.execute('carro', function(error, result){
        if(error){
            console.log(error)
            return
        }
        console.log(result)
    });
}