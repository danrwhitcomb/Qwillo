var accountService = require('../services/accountService');
var defines = require('../system/defines');
var async = require('async');
var utils = require('../system/utils');
var userModel = require('../models/userModel');
var bcrypt = require('bcrypt');

var User = userModel;

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
	if(req.session.user){
		utils.sendErr(res, defines.messages.loggedIn);
	} else {
		var user = new User({
			username: req.body.username,
			usernameLower: req.body.username.toLowerCase(),
			password: req.body.password,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			isAdmin: false,
			isConfirmed: true,
			isActive: true,
			history: {},
		});

		user.save(function(err, user){
			if(err) utils.sendErr(res, err);
			else {
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
		User.findOne({usernameLower: req.body.username.toLowerCase()}, function(err, user){
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
	res.render('account/login', {base: req.model});
};

module.exports.logout = function(req, res){
	if(req.session.user == null){
		res.send({status: "You are not logged in!"});
	} else {
		req.session = null;
		res.send({status: defines.messages.successCode});
	}
};

