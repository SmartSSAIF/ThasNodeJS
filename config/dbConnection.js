var mysql = require('mysql');
var connMySQL = function(){

	console.log('criou conexao');
		return mysql.createConnection({
		host : 'afterthat.com.br',
		user : 'awsbanco1',
		password : 'petequinha',
		database : 'thas'

	});
};



module.exports = function(){
	console.log("Conectou ao servidor bd");
	return connMySQL;
};
