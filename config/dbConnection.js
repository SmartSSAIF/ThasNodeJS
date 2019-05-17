var mysql = require('mysql');
var connMySQL = function(){

	console.log('criou conexao');
		return mysql.createConnection({
		host : '54.207.71.24',
		user : 'awsbanco1',
		password : 'petequinha',
		database : 'thas'

	});
};



module.exports = function(){
	console.log("Conectou ao servidor bd");
	return connMySQL;
};
