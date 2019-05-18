var mysql = require('mysql');
var connMySQL = function(){

	console.log('criou conexao');
		return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'peteca',
		database : 'thas'

	});
};



module.exports = function(){
	console.log("Conectou ao servidor bd");
	return connMySQL;
};
