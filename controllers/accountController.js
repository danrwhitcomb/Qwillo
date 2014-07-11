var accountService = require('../services/accountService')

module.exports.getUserProfile = function(req, res){
  res.send("This is the user profile page");
};

module.exports.getUserSettings = function(req, res){
	res.send('This is the user settings page');
};

module.exports.accountSignup = function(req, res){
	if(req.user != null){
		res.render('errors/alreadyLoggedIn', {base: req.model});
	} else {
		res.render('account/signupForm', {base: req.model});
	}
};

module.exports.doSignup = function(req, res){
	var user = accountService.signupUser(req.body);
	if(user){
		req.login(user, function(err){
			if(err){return next(err);}
		});
		res.send('Success!');
	}
	else{
		res.status(500);
		res.send("An error occured");
	}
};