var mysql = require('mysql');
var connMySQL = function(){

	console.log('criou conexao');
		return mysql.createConnection({
		host : 'localhost',
		user : 'awsbanco1',
		password : 'petequinha',
		database : 'thas',
		multipleStatements: true
	});
};



module.exports = function(){
	console.log("Conectou ao servidor bd");
	return connMySQL;
};
