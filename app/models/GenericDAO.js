function GenericDAO(connection){

	this._connection = connection;
}

GenericDAO.prototype.create = async function(field,table,callback){
	console.log("chegou para criar")
	let x = this._connection.query("insert into "+table+" set ?",[field], callback);
}
GenericDAO.prototype.read = async function(table, callback) {
	console.log("leia");
	this._connection.query("select * from "+table, callback);
}
GenericDAO.prototype.find = async function(field,table, callback) {
//	this._connection.query("select * from  ? where ? = ?", [field, field2, table], callback);
this._connection.query("select * from "+table+" where ?",field, callback);

}
GenericDAO.prototype.update =async function(value,field2,table, callback){
	//this._connection.query("update "+table+" set ? where "+field+"= ?",[value,field2],callback);
	console.log("update");
	this._connection.query("update "+table+" set ? where ?",[value,field2],callback);
}
GenericDAO.prototype.delete = async function(field,table, callback) {
this._connection.query("delete from "+table+" where ?",field, callback);

}
GenericDAO.prototype.execute = async function(field, callback) {
this._connection.query(field, callback);

}
// call
module.exports = function(){
	return GenericDAO;
}
