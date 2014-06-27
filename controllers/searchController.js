var searchViewModels = require('./viewModels/searchViewModel');

module.exports.doSearch = function(req, res){
	var search = req.query.q;
	var model = searchViewModels.model;
	model.base = req.model;
	model.query = search;
	
	res.render('search', model);
};