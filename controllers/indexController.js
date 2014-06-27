
/*
 * GET home page.
 */
var viewModels = require('./viewModels/indexViewModel');
var defines = require('../system/defines');

module.exports.index = function(req, res){
	
	var model = viewModels.indexModel;
	model.base = req.model;
	model.title = defines.appName + " | Home";
	
	res.render('index', model);
};