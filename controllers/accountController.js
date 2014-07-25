var accountService = require('../services/accountService');
var defines = require('../system/defines');

module.exports.getUserProfile = function(req, res){
  res.send("This is the user profile page");
};

module.exports.getUserSettings = function(req, res){
	res.send('This is the user settings page');
};

module.exports.registerUser = function(req, res){
	if(res.locals.user != null){
		res.render('errors/alreadyLoggedIn', {base: req.model});
	} else {
		res.render('account/register', {base: req.model, title: "Register"});
	}
};

module.exports.doSignup = function(req, res){
	var account = {
			givenName: req.body.givenName,
			surname: req.body.surname,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
	};
	
	var app;
	req.model.stormpathClient.getApplication(defines.stormpath.appAddress, function(err, gotApp) {
		if(err) res.send({"status": err});
		else { 
			gotApp.createAccount(account, function onAccountCreated(err, createdAccount) {
				if(err){
					res.send({"status": err});
				} else {
					res.send({"status": defines.successCode});
				}
			});
		};
	});
};

