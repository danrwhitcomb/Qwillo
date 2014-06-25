
/*
 * GET home page.
 */
var viewModels = require('./viewModels/indexViewModel');
var defines = require('../system/defines');

module.exports.index = function(req, res){
	
	var model = new viewModels.indexModel();
	if(req.user != null){
		model.username = req.user.username;
	}
	else
	{
		model.username = "Login";
	}
	
	model.title = defines.appName + " | Home";
	
	res.render('index', model);
};