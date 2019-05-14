
var mysql = require('mysql');
var connMySQL = function () {
    console.log('criou conexao');
    return mysql.createConnection({
        host: '192.168.15.254',
        user: 'monitor',
        password: 'lasvegas2019tech',
        database: 'monitor'

    });
};



module.exports = function () {
    return connMySQL;
};
