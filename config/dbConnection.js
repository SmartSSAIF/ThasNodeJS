var mysql = require('mysql');
var connMySQL = function(){
	console.log("Criou conexao ");
	// return mysql.createConnection({
	// 	host : '192.168.15.254',
	// 	user : 'monitor',
	// 	password : 'lasvegas2019tech',
	// 	database : 'monitor'

	// });
	// return mysql.createConnection({
	// 	host : 'localhost',
	// 	user : 'local1',
	// 	password : 'p3tecH4mbul4nt3#%&(#',
	// 	database : 'thas'

	// });
		return mysql.createConnection({
		host : 'monitor.afterthat.com.br',
		user : 'monitor',
		password : 'M0nItorDB*',
		database : 'thas '

	});
};



module.exports = function(){
	console.log("Conectou ao servidor bd");
	return connMySQL;
};
