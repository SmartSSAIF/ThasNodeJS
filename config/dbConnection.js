var mysql = require('mysql');
var connMySQL = function(){
	console.log("Criou conexao ");
	return mysql.createConnection({
		host : '18.228.197.162',
		user : 'root',
		password : 'petequinha',
		database : 'webduplainter'

	});
	// 	return mysql.createConnection({
	// 	host : 'localhost',
	// 	user : 'peteca',
	// 	password : 'petecambulante123',
	// 	database : 'webdupla'

	// });
};



module.exports = function(){
	console.log("Conectou ao servidor bd");
	return connMySQL;
};
