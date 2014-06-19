
/*
 * GET home page.
 */
var viewModels = require('./viewModels/index');

exports.index = function(req, res){
	
	var model = new viewModels.indexModel();
	model.username = req.user.username;
	model.title = 'Title is Something';
	
	res.render('index', model);
};