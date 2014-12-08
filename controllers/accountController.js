var accountService = require('../services/accountService');
var defines = require('../system/defines');
var async = require('async');
var utils = require('../system/utils');
var userModel = require('../models/userModel');
var bcrypt = require('bcrypt');

var User = userModel;

module.exports.getUser = function(req, res){
	User.find({usernameLower: req.session.user.username}, function(err, user){
		if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError, error: err});
		else if(user.length() === 0){
			res.send({status:  defines.messages.accountErrorCode, 
					  message: defines.messages.dataNotFound});
		} else {
			user = user[0];
			user.password = "DATA OMITTED";
			utils.sendSuccess(user);
		}
	}).limit(1);
};

module.exports.getUserProfilePage = function(req, res){

};

module.exports.getUserSettingsPage = function(req, res){

}

module.exports.getUserSettings = function(req, res){
	res.send('This is the user settings page');
};

module.exports.registerUser = function(req, res){
	if(res.locals.user != null){
		res.send({status:  defines.messages.accountErrorCode, 
				  message: defines.messages.alreadyLoggedIn});
	} else {
		res.render('account/register');
	}
};


module.exports.doSignup = function(req, res){
	if(req.session.user){
		utils.sendErr(res, defines.messages.loggedIn);
	} else {
		var user = new User({
			username: req.body.username,
			usernameLower: req.body.username.toLowerCase(),
			password: req.body.password,
			email: req.body.email.toLowerCase(),
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			isAdmin: false,
			isConfirmed: true,
			isActive: true,
			history: {},
		});



		user.save(function(err, user){
			if(err) {
				utils.sendErr(res, {status:  defines.messages.serverError,
									message: defines.decodeDatabaseError(err),
									error:   err});
			} else {
				req.session.user = {username: user.username}
				utils.sendSuccess(res);
			}
		});
	}
};

module.exports.login = function(req, res){
	if(req.session.user != null){
		utils.sendErr(res, defines.messages.alreadyLoggedIn);
	} else {
		User.findOne({email: req.body.email.toLowerCase()}, function(err, user){
			if(err || !user){
				utils.sendErr(res, defines.messages.invalidCredentials);
			} else {
				bcrypt.compare(req.body.password, user.password, function(err, result){
					if(result){
						req.session.user = {username: user.username}
						utils.sendSuccess(res);
					} else {
						utils.sendErr(res, defines.messages.invalidCredentials);
					}
				});
			}
		});
	}
};

module.exports.loginPage = function(req, res){
	res.render('account/login');
};

module.exports.signupPage = function(req, res){
	res.render('account/signup');
}

module.exports.logout = function(req, res){
	if(req.session.user == null){
		res.send({status: defines.messages.accountErrorCode,
				  message: defines.messages.notLoggedIn});
	} else {
		req.session = null;
		utils.sendSuccess(res);
	}
};

