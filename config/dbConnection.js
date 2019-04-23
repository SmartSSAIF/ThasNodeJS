var mysql = require('mysql');
var connMySQL = function(){
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
