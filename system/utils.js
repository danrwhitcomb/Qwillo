var defines = require('./defines');

//POST-WARE
module.exports.sendSuccess = function(res, data){
	res.send({status: defines.messages.successCode,
			  message: defines.messages.success,
			  data: data});
};

module.exports.sendErr = function(res, err){
	res.send({status: err});
};

//PRE-WARE
module.exports.isLoggedIn = function(){
	return function(req, res, next){
		if(req.session.user == null) res.send({status:defines.message.accountErrorCode, message: defines.message.notLoggedIn});
		else next();
	};
};

module.exports.isNotLoggedIn = function(){
	return function(req, res, next){
		if(req.session.user) res.send({status:defines.message.accountErrorCode, message: defines.message.notLoggedIn});
		else next();
	};
}

function isAdmin(){
	return function(req, res, next){
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
	};
};