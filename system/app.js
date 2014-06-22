
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
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

//Controllers
var indexController = require('../controllers/index');
  
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + './../views');
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(methodOverride('X-HTTP_Method-Override'));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//passport config
var user = require('../repositories/models/user');
passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

passport.deserializeUser(function(id, done) {
	findById(id, function (err, user) {
		done(err, user);
	});
});

//Passport strategy
passport.use(new LocalStrategy(
function(username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }
		if (!user.verifyPassword(password)) { return done(null, false); }
		return done(null, user);
    });
  }
));

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose');

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

app.get('/', indexController.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
