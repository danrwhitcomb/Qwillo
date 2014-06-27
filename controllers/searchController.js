
module.exports.doSearch = function(req, res){
	var search = req.query.q;
	console.log(search);
	res.send('You made a search for: ' + search.replace('+', ' '));
};