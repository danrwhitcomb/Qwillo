
/*
 * GET home page.
 */
var viewModels = require('./viewModels/index');

module.exports.index = function(req, res){
	
	var model = new viewModels.indexModel();
	if(req.user != null){
		model.username = req.user.username;
	}
	else
	{
		model.username = "Signup/login";
	}
	
	model.title = 'Title is Something';
	
	res.render('index', model);
};