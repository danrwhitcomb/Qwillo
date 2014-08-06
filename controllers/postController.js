
module.exports.getPost = function(req, res){
	res.send('This is the post page');
};

module.exports.submitPage = function(req. res){
	res.render('post/submit', req.model);
};

module.exports.submitPost = function(req, res){

};

module.exports.deletePost = function(req, res){

};
