

module.exports = function (app) {


	// app.post('/register', async function (req, res) {
	// 	app.app.controller.login.register(app, req, res);
	// });

	app.post('/autenticacao', async function (req, res) {

		app.app.controller.login.autenticar(app, req, res);


	});

	app.post('/logout', async function (req, res) {

		app.app.controller.login.logout(app, req, res);


	});


}
