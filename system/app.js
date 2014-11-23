
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
var config = require('./config');


if(!process.argv[2] || process.argv[2] == "local"){
  console.log("Building local server . . . ");
  config = config.local;
} else if(process.argv[2] == "test"){
  console.log("Building test server . . .");
  config = config.test;
} else {
  console.log("Please enter a valid build type");
  app.close();
}

if(!process.argv[3]){
  config.port = process.argv[3];
} else {
  config.port = 3000;
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/../public/images/favicons/favicon-32x32.png'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP_Method-Override'));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cookieParser(config.session.parser));
app.use(cookieSession({
	keys: [config.session.session_one, config.session.session_two],
	secret: config.session.secret,
}));

// mongoose
mongoose.connect(config.db.connectionString);

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
  var model = require('../controllers/viewModels/baseViewModel');
  req.model = model.model();
  if(req.session.username){
    req.model.username = req.session.username;
  }
  req.model.stormpathClient = client;
  next();
});

routes.defineRoutes(app);

http.createServer(app).listen(config.port, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
