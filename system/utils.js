var defines = require('./defines');
var User = require('../models/userModel');

//POST-WARE
module.exports.sendSuccess = function(res, data){
	res.send({status: defines.response.codes.success,
			  message: defines.response.messages.success,
			  data: data});
};

module.exports.sendErr = function(res, code, message){
	res.send({status: code, message: message});
};

//PRE-WARE
module.exports.isLoggedIn = function(){
	return function(req, res, next){
		if(req.session.user == null) res.send({status:defines.response.messages.accountError, message: defines.response.codes.notLoggedIn});
		else next();
	};
};

module.exports.isNotLoggedIn = function(){
	return function(req, res, next){
		if(req.session.user) res.send({status:defines.response.codes.accountError, message: defines.response.messages.notLoggedIn});
		else next();
	};
};

module.exports.isAdmin = function(){
	return function(req, res, next){
		if(!req.session.user) res.sendStatus(403);
		else {
			User.findOne({usernameLower: req.session.user.username.toLowerCase()}, function(err, user){
				if(err || !user){
					res.sendStatus(403);
				} else {
					if(user.isAdmin){
						next();
					} else {
						res.sendStatus(403);
					}
				}
			});
		}
		
	};
};

module.exports.debugLog = function(message){
	if(process.argv[4] && process.argv[4].toLowerCase() == "debug"){
		console.log(message);
	}
}

module.exports.print = function(){

}