var mysql = require('mysql');
var connMySQL = function(){

	console.log('criou conexao');
		return mysql.createConnection({
		host : 'localhost',
		user : 'newuser',
		password : 'p3T#ch&$$',
		database : 'thas'

	});
};



module.exports = function(){
	console.log("Conectou ao servidor bd");
	return connMySQL;
};
