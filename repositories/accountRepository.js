var mongoose = require('mongoose');
var User = require('./models/userModel');
var user = mongoose.model('User', User);

module.exports.isEmailTaken = function(email) {
	var result = null;
	User.findOne({'email': email}, function(error, user){
		if(error){
			return false;
		}
		
		result = user != null;
	});
	
	return result;
};

module.exports.isUsernameTaken = function(username) {
	var result = null;
	User.findOne({'username': username}, function(error, user){
		if(error){
			return false;
		}
		
		result = user != null;
	});
	
	return result;
};

module.exports.addUser = function(params) {
	var user = new User({username: params.username,
						 password: params.password,
						 email: params.email,
						 first_name: params.first_name,
						 last_name: params.last_name,
						 });
	
	if(params.isAdmin != null){
		user.isAdmin = params.isAdmin;
	}
	
	var result = true;
	
	user.save(function(err){
		if(err) {
			console.log("Ooops");
			result = false;
		}
	});
	return user;
};