
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var authConfig = require('./auth');
const https = require('https');
// var webSocket = require('./../app/models/webSocket')
// var criaWebSockets = require('./../app/models/criaWebSockets')()
var Singleton = require('./../app/models/singletonCarrosWs');
console.log('TYPE ', typeof Singleton)

// var logger = Singleton.getInstance().getCarros();

// class Store {

//     constructor(name, inventory=[]) {
//         this.name = name;
//         this.inventory = inventory;
//         logger.log(`New Store: ${name} has ${inventory.length} items in stock.`);
//     }

// }

// module.exports = Store;
//var jquery = require('jQuery');
var cors = require('cors');

var session = require('express-session');
var flash = require('connect-flash');


var app = express();

//setar view engine e view express

app.set('view engine','ejs');
app.set('views','./app/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./app/public'));
app.use(session({
	secret: authConfig.secret,
	resave: false,
	saveUnintialized: false,
}))
app.use(flash())
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg')
	next()
})
app.use(cors());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


// app.use(cors());
//app.use(jquery)
app.use(expressValidator());

// app.use(Singleton().getInstance())
//autoload das rotas e modulos do objeto app
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controller')
	.into(app);

// var ws =  new webSocket()
module.exports = app;
