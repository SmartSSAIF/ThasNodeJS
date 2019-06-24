auth = require('./../controller/auth')

module.exports = function(app) {
	app.get('/pedidosFinalizados', auth.verify,function(req,res){
     app.app.controller.pedidosFinalizados.get(app, req, res);
	}) ;

}
