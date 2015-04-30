
/**
 * Module dependencies.
 */
//Modules
var express = require('express')
  , subdomain = require('express-subdomain')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , morgan = require('morgan')
  , errorHandler = require('errorhandler')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , cookieParser = require('cookie-parser')
  , cookieSession = require('cookie-session');


//Custom Modules
var routes = require('./routes');
  
var app = express();
var config = {};
try{
  config = require('./config');
} catch(e){
  console.log("No configuration file detected");
}


if(!process.argv[2] || process.argv[2] == "local"){
  console.log("Building local server . . . ");
  config = config.local;
} else if(process.argv[2] == "test"){
  console.log("Building test server . . .");
  config.session = {};
  config.session.parser = process.env.PARSER;
  config.session.session_one = process.env.SESSION_ONE_KEY;
  config.session.session_two = process.env.SESSION_TWO_KEY;
  config.session.secret = process.env.SESSION_SECRET;
  config.db = {};
  config.db.connectionString = process.env.MONGOLAB_URI;
  config.stormpath = {};
  config.stormpath.id = process.env.STORMPATH_ID;
  config.stormpath.secret = process.env.STORMPATH_SECRET;
} else {
  console.log("Please enter a valid build type");
  app.close();
}

if(process.argv[3]){
  config.port = process.argv[3];
} else {
  config.port = 3000;
}

console.log("Listening on port: " + config.port)

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP_Method-Override'));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cookieParser(config.session.parser));
app.use(cookieSession({
	keys: [config.session.session_one, config.session.session_two],
	secret: config.session.secret,
}));

// mongoose
try{
  mongoose.connect(config.db.connectionString);
} catch(e){
  console.log("Could not connect to:" + config.db.connectionString);
  app.close();
}
// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

var utils = require('./utils');

//Baseview model for common data
app.use(function(req, res, next){
  req.model = {};
  if(req.session.user){
    utils.populateUser(req, res, next, req.session.user.id)
  } else {
    next();
  }
});

routes.defineRoutes(app, subdomain);

app.listen(config.port);
