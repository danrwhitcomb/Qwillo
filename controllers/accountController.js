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
		if(err) res.send({status: err});
		else { 
			gotApp.createAccount(account, function onAccountCreated(err, createdAccount) {
				if(err){
					res.send({status: err});
				} else {
					req.session.username = req.body.username;
					res.send({status: defines.messages.successCode});
				}
			});
		};
	});
};

module.exports.login = function(req, res){
	if(req.session.username != null){
		res.send({status:"You are already logged in!"});
	} else {

		req.model.stormpathClient.getApplication(defines.stormpath.appAddress, function(err, gotApp) {
			if(err) res.send({status: err});
			else { 
				var authcRequest = { username: req.body.username, password: req.body.password};
				gotApp.authenticateAccount(authcRequest, function onAuthcResult(err, result) {
					if(err) res.send({status: err});
					else {
						result.getAccount(function(err, account) {
							  if(err) res.send({status: err});
							  else {
								  req.session.username = account.username;
								  res.send({status: defines.messages.successCode});
							  }
						  });
					}
				});
			}
		});
	}
};

module.exports.logout = function(req, res){
	if(req.session.username == null){
		res.send({status: "You are not logged in!"});
	} else {
		req.session = null;
		res.send({status: defines.messages.successCode});
	}
};

