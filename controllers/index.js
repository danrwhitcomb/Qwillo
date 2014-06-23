
/*
 * GET home page.
 */
var viewModels = require('./viewModels/index');
var defines = require('../system/defines');

module.exports.index = function(req, res){
	
	var model = new viewModels.indexModel();
	if(req.user != null){
		model.username = req.user.username;
	}
	else
	{
		model.username = "Signup/login";
	}
	
	model.title = defines.appName + " | Home";
	
	res.render('index', model);
};