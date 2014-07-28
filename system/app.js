
/**
 * Module dependencies.
 */
//Modules
var express = require('express')
  , favicon = require('serve-favicon')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , morgan = require('morgan')
  , errorHandler = require('errorhandler')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , stormpath = require('stormpath')
  , cookieParser = require('cookie-parser')
  , cookieSession = require('cookie-session')


//Custom Modules
var routes = require('./routes');
  
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP_Method-Override'));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cookieParser('THIS IS A SECRET!!!!'));
app.use(cookieSession({
	keys: ['SiddarthHiregowdara', 'DanielRowanWhitcomb'],
	secret: 'Knights of the Round Table',
}));

// mongoose
mongoose.connect('mongodb://localhost/local_mongoose');

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}


//Stormpath Setup
var client;
var apiKeyFilePath = __dirname + '/../.stormpath/apiKey.properties';
stormpath.loadApiKey(apiKeyFilePath, function apiKeyFileLoaded(err, apiKey) {
  client = new stormpath.Client({apiKey: apiKey});
});

//Baseview model for common data
app.use(function(req, res, next){
	req.model = require('../controllers/viewModels/baseViewModel').model;
	if(req.session.username){
		req.model.username = req.session.username;
	}
	req.model.stormpathClient = client;
	next();
});

routes.defineRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
