
/*
 * GET home page.
 */
var viewModels = require('./viewModels/indexViewModel');
var defines = require('../system/defines');

module.exports.index = function(req, res){
	
	var model = new viewModels.indexModel();
	if(req.user != null){
		model.base.username = req.user.username;
	}
	
	model.title = defines.appName + " | Home";
	
	res.render('index', model);
};